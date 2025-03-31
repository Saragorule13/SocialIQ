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

import os
import dotenv

dotenv.load_dotenv()

client = ApifyClient(os.getenv("APIFY_API_TOKEN"))
dbclient = DataAPIClient(os.getenv("ASTRA_DB_TOKEN"))
db = dbclient.get_database_by_api_endpoint(
  "https://654d738f-1326-4e94-a2a0-cf79bd1ac826-us-east-2.apps.astra.datastax.com"
)
client = Groq()
# llm = init_chat_model("deepseek-r1-distill-llama-70b", model_provider="groq", api_key=os.getenv("GROQ_API_KEY"))

print(f"Connected to Astra DB: {db.list_collection_names()}")

coll_cursor = db.list_collections()
cursor = db.get_collection("posts")

app = FastAPI()

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
    
@app.get("/chat/{username}")
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

    chat_completion = client.chat.completions.create(
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

@app.post("/chat/{username}")
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

    chat_completion = client.chat.completions.create(
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