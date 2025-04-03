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

client = ApifyClient(os.getenv("APIFY_API_TOKEN"))
dbclient = DataAPIClient(os.getenv("ASTRA_DB_TOKEN"))
db = dbclient.get_database_by_api_endpoint("https://654d738f-1326-4e94-a2a0-cf79bd1ac826-us-east-2.apps.astra.datastax.com")
collection = db.get_collection("posts")
profiles_collection = db.get_collection("profiles")

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

                filtered_item = {
                    "id": item["id"],
                    "username": item["username"],
                    "full_name": item.get("full_name"),
                    "followersCount": item.get("followersCount"),
                    "followsCount": item.get("followsCount"),
                    "bio": item.get("biography"),
                    "hasChannel": item.get("hasChannel"),
                    "highlightReelCount": item.get("highlightReelCount"),
                    "isBusinessAccount": item.get("isBusinessAccount"),
                    "businessCategoryName": item.get("businessCategoryName"),
                    "private": item.get("Private"),
                    "verified": item.get("Verified"),
                    "profilePicUrl" : item.get("profilePicUrl"),
                    "profilePicUrlHD": item.get("profilePicUrlHD"),
                    "igtvVideoCount": item.get("igtvVideoCount"),
                    "postsCount": item.get("postsCount"),
                }

                if not existing_profile:  
                    profiles_collection.insert_one(filtered_item)  
                    results.append({"status": "stored", "data": filtered_item})
                else:
                    results.append({"status": "already exists", "data": filtered_item})

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
    documents = collection.find({"ownerUsername" : [username]})
    posts = [doc for doc in documents]
    return {"data" : posts}



