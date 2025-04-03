from apify_client import ApifyClient
from fastapi import FastAPI
from astrapy import DataAPIClient

from groq import Groq
from langchain.chat_models import init_chat_model
from langchain_core.messages import HumanMessage, SystemMessage
from langchain_core.vectorstores import InMemoryVectorStore
from langchain_core.documents import Document
from langchain_text_splitters import RecursiveCharacterTextSplitter
from langchain_community.document_loaders import UnstructuredMarkdownLoader
from langchain_community.embeddings import HuggingFaceInferenceAPIEmbeddings
from langchain import hub
from langgraph.graph import START, StateGraph

from pydantic.main import BaseModel
from typing_extensions import List, TypedDict

from transformers import pipeline
from fastapi.middleware.cors import CORSMiddleware

import os
import dotenv

dotenv.load_dotenv()

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # For development only, restrict in production
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

client = ApifyClient(os.getenv("APIFY_API_TOKEN"))
dbclient = DataAPIClient("AstraCS:IEsGrZCUZIUTuJXDckHGJWEg:76f5c96c82c3f8cfc1018038ab3fc882457e8c718236b73736904cc26ade0ba1")
db = dbclient.get_database_by_api_endpoint(
  "https://654d738f-1326-4e94-a2a0-cf79bd1ac826-us-east-2.apps.astra.datastax.com"
)
client_g = Groq()
# llm = init_chat_model("deepseek-r1-distill-llama-70b", model_provider="groq", api_key=os.getenv("GROQ_API_KEY"))

print(f"Connected to Astra DB: {db.list_collection_names()}")

coll_cursor = db.list_collections()
cursor = db.get_collection("posts")
profiles_collection = db.get_collection("profiles")
keyspace = "default_keyspace"

#to fetch profiles

@app.get("/fetch-and-store-profile/{username}")
async def fetch_and_store_profile(username: str):
    try:
        run_input = {"usernames": [username]}  
        run = client.actor("dSCLg0C3YEZ83HzYX").call(run_input=run_input)
        dataset_id = run.get("defaultDatasetId")
        if not dataset_id:
            return {"error": "No dataset ID returned. The actor might not have produced output."}

        results = []
        for item in client.dataset(dataset_id).iterate_items():
            if item.get("username") == username:
                profile_id = item["id"] 
                existing_profile = profiles_collection.find_one({"id": profile_id})

                if not existing_profile:  
                    profiles_collection.insert_one(item)  
                    results.append({"status": "stored", "data": item})
                else:
                    results.append({"status": "already exists", "data": item})

        if not results:
            return {"error": "No exact match found for this username."}

        return {"message": "Profile processed successfully", "data": results}

    except Exception as e:
        return {"error": str(e)}
    
@app.get("/get-profiles/{username}")
async def get_profile(username: str):
    try:
        # Fetch the profile from the database
        profile = profiles_collection.find_one({"username": username})
        
        if not profile:
            return {"error": "Profile not found."}
        
        # Convert the profile to a JSON-serializable format
        profile["_id"] = str(profile["_id"])  # Convert ObjectId to string
        return {"data": profile}
    
    except Exception as e:
        return {"error": str(e)}
    
@app.get("/get-data/{username}")
async def get_data(username: str):
    documents = cursor.find({"ownerUsername" : [username]})
    posts = [doc for doc in documents]
    return {"data" : posts}

 

#to fetch posts
@app.get("/fetch/{username}/{posts}")
async def root(username: str, posts: int):
    run_input = {
        "directUrls": [f"https://www.instagram.com/{username}/"],
        "resultsType": "posts",
        "resultsLimit": posts,
        "searchType": "hashtag",
        "searchLimit": 1,
        "addParentData": False,
    }

    run = client.actor("shu8hvrXbJbY3Eb9W").call(run_input=run_input)
    for item in client.dataset(run["defaultDatasetId"]).iterate_items():
        #print(item)
        #print(type(item))
        result = cursor.find_one({"id": item["id"]})

        if (result == None):
            cursor.insert_one(item, vectorize=item["id"])
        else:
            print(f"Post is cached already! ({item["id"]})")
 
class Query(BaseModel):
    question: str
    

@app.post("/chat/{username}")
@app.options("/chat/{username}")
async def chat(username: str, request: Query):
    results = list(cursor.find({"ownerUsername": username}, projection={"type": True, "caption": True, "commentsCount": True, "alt": True, "likesCount": True, "ownerFullName": True, "videoDuration": True, "videoViewCount": True, "videoPlayCount": True}))
    knowledge = []
    if not results:  
        await root(username, 2) 
        results = list(cursor.find({"ownerUsername": username}))  
    if results:
        for doc in results:
            knowledge.append(doc)
    else:
        return "No posts found even after fetching."
        
    # print(knowledge)

    chat_completion = client_g.chat.completions.create(
        messages=[
            {
                "role": "system",
                "content": f"you will solve the users queries about social media with your data {knowledge}."
            },
            {
                "role": "user",
                "content": f"{request}",
            }
        ],
    
        model="llama-3.3-70b-versatile",
        temperature=0.7,
        max_completion_tokens=1024,
        top_p=1,
        stop=None,
        stream=False,
    )
    
    return (chat_completion.choices[0].message.content)



    
from statistics import mean

sentiment_pipeline = pipeline("sentiment-analysis")

@app.get("/analysis/{username}")
async def analysis(username: str):
    results = list(cursor.find({"ownerUsername": username}, projection={"latestComments": True}))
    texts = [comment["text"] for doc in results for comment in doc.get("latestComments", []) if comment["text"].strip()]
    
    if not texts:
        return {"error": "No valid comments found"}
    
    sentiment_scores = sentiment_pipeline(texts)

    positive_scores = [s["score"] for s in sentiment_scores if s["label"] == "POSITIVE"]
    negative_scores = [s["score"] for s in sentiment_scores if s["label"] == "NEGATIVE"]

    scores = {
        "average_positive_sentiment": mean(positive_scores) if positive_scores else 0,
        "count_positive": len(positive_scores),
        "average_negative_sentiment": mean(negative_scores) if negative_scores else 0,
        "count_negative": len(negative_scores)
    }
    
    chat_completion = client.chat.completions.create(
        messages=[
            {
                "role": "system",
                "content": f"Help the user interpret the sentiment score of their comments be conscise and clear and straight to the point"
            },
            {
                "role": "user",
                "content": f"{scores}",
            }
        ],
    
        model="llama-3.3-70b-versatile",
        temperature=0.7,
        max_completion_tokens=1024,
        top_p=1,
        stop=None,
        stream=False,
    )
    
    return (chat_completion.choices[0].message.content)

