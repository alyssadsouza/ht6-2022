from pymongo import MongoClient
from flask import request
from app import app

cluster = MongoClient('mongodb+srv://alyssadsouza:potatoes123@cluster0.huntx3g.mongodb.net/?retryWrites=true&w=majority')
db = cluster['ht6-2022']
collection = db['users']

# post = {"_id": 0, "email": "potatoes@gmail.com", "whitelisted": [], "blacklisted": []}

# collection.insert_one(post)

@app.route('/api/users/<id>')
def index(id):
    user = collection.find_one({"_id":id})
    return {"message": user}

@app.route('/api/users/whitelist/<id>', methods = ['PUT'])
def pushWhitelist(id):
    try:
        user = collection.update_one({"_id":id}, {"$push": {"whitelisted": request.body.url}})
        return {"message": user}
    except:
        return {"message": "An error occured trying to update user whitelist"}

@app.route('/api/users/blacklist/<id>', methods = ['PUT'])
def pushBlacklist(id):
    try:
        user = collection.update_one({"_id":id}, {"$push": {"blacklisted": request.body.url}})
        return {"message": user}
    except:
        return {"message": "An error occured trying to update user blacklist"}

@app.route('/api/users/blacklist/<id>', methods = ['DELETE'])
def pullWhitelist(id):
    try:
        user = collection.update_one({"_id":id}, {"$pull": {"whitelisted": request.body.url}})
        return {"message": user}
    except:
        return {"message": "An error occured trying to update user whitelist"}

@app.route('/api/users/blacklist/<id>', methods = ['DELETE'])
def pullBlacklist(id):
    try:
        user = collection.update_one({"_id":id}, {"$pull": {"blacklisted": request.body.url}})
        return {"message": user}
    except:
        return {"message": "An error occured trying to update user blacklist"}