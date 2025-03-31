import os
import json
from dotenv import load_dotenv
import requests

from cassandra.cluster import Cluster, ExecutionProfile, EXEC_PROFILE_DEFAULT, ProtocolVersion
from cassandra.auth import PlainTextAuthProvider
from astrapy import DataAPIClient

from fastapi import FastAPI, Response
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from typing import List

load_dotenv()

'''
Download SCB
'''

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

client = DataAPIClient(str(os.getenv("ASTRA_DB_TOKEN")))
db = client.get_database_by_api_endpoint(
  "https://654d738f-1326-4e94-a2a0-cf79bd1ac826-us-east-2.apps.astra.datastax.com"
)

print(f"Connected to: {db.list_collection_names}")

cursor = db.get_collection("profiles")
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

class UserRequest(BaseModel):
    username: str

@app.post("/insert")
async def insert(user: UserRequest):
    try:
        result = cursor.find_one(
            {"username": user.username},
            projection={"profilePicUrl": 1, "_id": 0}
        )

        result = dict(result)["profilePicUrl"]

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
