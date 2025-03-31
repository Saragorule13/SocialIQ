from apify_client import ApifyClient
from fastapi import FastAPI, Response
from fastapi.middleware.cors import CORSMiddleware
from astrapy import DataAPIClient
from cassandra.cluster import Cluster, ExecutionProfile, EXEC_PROFILE_DEFAULT, ProtocolVersion
from cassandra.auth import PlainTextAuthProvider

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
import json
import requests

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
profile_cursor = db.get_collection("profiles")
cursor = db.get_collection("posts")
keyspace = "default_keyspace"

app = FastAPI()
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/ping")
def ping():
    return {"message": "Pong"}

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
            print(f"Post is cached already! ({item['id']})")

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


cloud_config= {
    'secure_connect_bundle': "Secure Connect SocialQ.zip",
    'connect_timeout': 30
}
auth_provider=PlainTextAuthProvider("token", os.getenv("ASTRA_DB_APPLICATION_TOKEN"))
profile = ExecutionProfile(request_timeout=30)
cluster = Cluster(
    cloud=cloud_config,
    auth_provider=auth_provider,
    execution_profiles={EXEC_PROFILE_DEFAULT: profile},
    protocol_version=ProtocolVersion.V4
)
session = cluster.connect()

class UserRequest(BaseModel):
    username: str

@app.post("/insert")
async def insert(user: UserRequest):
    try:
        result = profile_cursor.find_one(
            {"username": user.username},
            projection={"profilePicUrl": 1, "_id": 0}
        )

        result = dict(result)["profilePicUrl"]
        print(result)

        if result == None:
            return {"error": "User not found!"}

        response = requests.get(result)
        image_data = response.content

        insert_query = session.prepare("INSERT INTO default_keyspace.images (id, image) VALUES (?, ?)")
        session.execute(insert_query, (user.username, image_data))

        return (result)


    except Exception as e:
        print(f"Error: {e}")

    return 1

@app.get("/image/{username}")
async def get_image(username: str):
    try:
        query = "SELECT image FROM default_keyspace.images WHERE id = %s"
        result = session.execute(query, [username]).one()

        if result and result.image:
            return Response(content=bytes(result.image), media_type="image/jpeg")

        return {"error": "Image not found"}

    except Exception as e:
        return {"error": str(e)}
