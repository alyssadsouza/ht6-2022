from flask import Flask, request
from predict_api import getTheSummary
from search import html_to_text
from flask_cors import CORS, cross_origin
from users import collection
from pymongo import MongoClient

app = Flask(__name__)
cors = CORS(app)

@app.route('/')
@cross_origin()
def home():
    return {"message": "This works"}

@app.route('/get-summary')
@cross_origin()
def get_summary():
    url = html_to_text(request.args['url'])
    article = url.get_text()
    summary = getTheSummary(article)
    summary = summary[0]
    summary_lines = summary['summary_text'].split(".")
    print(summary_lines)
    summary_lines[:] = [line for line in summary_lines if line]
    return {"summary" : summary_lines}

@app.route('/api/users/<id>')
@cross_origin()
def index(id):
    # print(collection.find({"_id":id}))
    user = collection.find_one({"_id":int(id)})
    print(user)
    return {"message": user}

@app.route('/api/users/whitelist/<id>', methods = ['PUT', 'DELETE'])
@cross_origin()
def pushWhitelist(id):
    if request.method == 'PUT':
        try:
            user = collection.find_one({"_id":int(id)})
            if request.json['url'] not in user['whitelisted']:
                user = collection.update_one({"_id":int(id)}, {"$push": {"whitelisted": request.json['url']}})
            return {"message": user}
        except:
            return {"message": "An error occured trying to update user whitelist"}
    if request.method == 'DELETE':
        try:
            url_json = request.get_json()
            user = collection.update_one({"_id":int(id)}, {"$pull": {"whitelisted": url_json['url']}})
            return {"message": "success"}
        except:
            return {"message": "An error occured trying to update user whitelist"}

@app.route('/api/users/blacklist/<id>', methods = ['PUT', 'DELETE'])
@cross_origin()
def blacklist(id):
    if request.method == 'PUT':
        try:
            user = collection.find_one({"_id":int(id)})
            if request.json['url'] not in user['blacklisted']:
                user = collection.update_one({"_id":int(id)}, {"$push": {"blacklisted": request.json['url']}})
            return {"message": user}
        except:
            return {"message": "An error occured trying to update user blacklist"}
    if request.method == 'DELETE':
        try:
            url_json = request.get_json()
            user = collection.update_one({"_id":int(id)}, {"$pull": {"blacklisted": url_json['url']}})
            return {"message": user}
        except:
            return {"message": "An error occured trying to update user blacklist"}

# @app.route('/api/users/blacklist/<id>', methods = ['DELETE'])
# @cross_origin()
# def pullWhitelist(id):
    

# @app.route('/api/users/blacklist/<id>', methods = ['DELETE'])
# @cross_origin()
# def pullBlacklist(id):
    

if __name__=='__main__':
    app.run(debug=True)