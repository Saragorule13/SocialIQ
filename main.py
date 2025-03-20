from apify_client import ApifyClient
from fastapi import FastAPI
from astrapy import DataAPIClient

import os
import dotenv

dotenv.load_dotenv()

client = ApifyClient(os.getenv("APIFY_API_TOKEN"))
dbclient = DataAPIClient(os.getenv("ASTRA_DB_TOKEN"))
db = dbclient.get_database_by_api_endpoint(
  "https://654d738f-1326-4e94-a2a0-cf79bd1ac826-us-east-2.apps.astra.datastax.com"
)
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
