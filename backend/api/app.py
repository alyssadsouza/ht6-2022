from flask import Flask, request
from predict_api import getTheSummary
from search import html_to_text
from flask_cors import CORS, cross_origin

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

if __name__=='__main__':
    app.run(debug=True)