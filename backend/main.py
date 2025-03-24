from fastapi import FastAPI
from astrapy import DataAPIClient
from apify_client import ApifyClient
from fastapi.middleware.cors import CORSMiddleware
from dotenv import load_dotenv
import os

load_dotenv()

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

client = ApifyClient(os.getenv("REACT_APIFY_TOKEN"))
dbclient = DataAPIClient(os.getenv("ASTRA_DB_TOKEN"))
db = dbclient.get_database_by_api_endpoint("https://654d738f-1326-4e94-a2a0-cf79bd1ac826-us-east-2.apps.astra.datastax.com")
collection = db.get_collection("posts")
profiles_collection = db.get_collection("profiles")

@app.get("/fetch-and-store-profile")
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
 


@app.get("/get-data")
async def get_data():
    documents = collection.find({"ownerUsername" : "taylorswift"})
    posts = [doc for doc in documents]
    return {"data" : posts}



