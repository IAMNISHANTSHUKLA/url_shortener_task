from flask import Flask, request, jsonify, redirect
from flask_pymongo import PyMongo
from datetime import datetime, timedelta
import base62

app = Flask(__name__)

# Configure the MongoDB URI (replace <username>, <password>, <cluster-url>, and <db-name>)
app.config["MONGO_URI"] = "mongodb+srv://<username>:<password>@<cluster-url>/<db-name>?retryWrites=true&w=majority"
mongo = PyMongo(app)

@app.route('/')
def home():
    return 'Welcome to the Flask MongoDB App!'

@app.route('/add', methods=['POST'])
def add_document():
    data = request.json
    data['created_at'] = datetime.utcnow()
    data['expiry_date'] = datetime.utcnow() + timedelta(days=30)  # Example: adding an expiry date 30 days later
    mongo.db.my_collection.insert_one(data)  # Replace 'my_collection' with your collection name
    return jsonify({"status": "success", "data": data}), 201

@app.route('/get/<document_id>', methods=['GET'])
def get_document(document_id):
    document = mongo.db.my_collection.find_one({"_id": document_id})  # Replace 'my_collection' with your collection name
    if document:
        document["_id"] = str(document["_id"])  # Convert ObjectId to string
        return jsonify(document), 200
    else:
        return jsonify({"status": "error", "message": "Document not found"}), 404

@app.route('/shorten', methods=['POST'])
def shorten_url():
    data = request.json
    original_url = data.get('url')
    if not original_url:
        return jsonify({"status": "error", "message": "URL is required"}), 400

    # Generate a shortened URL using base62 encoding
    unique_id = base62.encode(datetime.utcnow().timestamp())
    shortened_url = f"http://short.url/{unique_id}"
    
    # Store the original and shortened URL in MongoDB
    mongo.db.urls.insert_one({"original_url": original_url, "shortened_url": shortened_url, "created_at": datetime.utcnow()})
    
    return jsonify({"status": "success", "shortened_url": shortened_url}), 201

@app.route('/<shortened_id>', methods=['GET'])
def redirect_to_url(shortened_id):
    document = mongo.db.urls.find_one({"shortened_url": f"http://short.url/{shortened_id}"})
    if document:
        return redirect(document["original_url"])
    else:
        return jsonify({"status": "error", "message": "URL not found"}), 404

if __name__ == '__main__':
    app.run(debug=True)
