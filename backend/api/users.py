from pymongo import MongoClient

cluster = MongoClient('mongodb+srv://alyssadsouza:potatoes123@cluster0.huntx3g.mongodb.net/?retryWrites=true&w=majority')
db = cluster['ht6-2022']
collection = db['users']

# post = {"_id": 0, "email": "potatoes@gmail.com", "whitelisted": [], "blacklisted": []}

# collection.insert_one(post)