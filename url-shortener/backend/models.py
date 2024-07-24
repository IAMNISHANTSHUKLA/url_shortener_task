from pymongo import MongoClient
from datetime import datetime

class URLModel:
    def __init__(self, db):
        self.db = db
        self.collection = self.db.urls

    def insert_url(self, original_url, short_url, expiration_date=None):
        self.collection.insert_one({
            'original_url': original_url,
            'short_url': short_url,
            'expiration_date': expiration_date
        })

    def find_url(self, short_url):
        return self.collection.find_one({'short_url': short_url})

    def delete_url(self, short_url):
        self.collection.delete_one({'short_url': short_url})

# Connect to MongoDB
client = MongoClient(os.getenv("MONGODB_URI"))
db = client.get_database()
url_model = URLModel(db)
