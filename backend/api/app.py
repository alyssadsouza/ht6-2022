from flask import Flask
from predict_api import getTheSummary
from search import html_to_text

app = Flask(__name__)

@app.route('/')
def home():
    return {"message": "This works"}

@app.route('/get-summary')
def get_summary():
    github_privacy = html_to_text("https://docs.github.com/en/site-policy/privacy-policies/github-privacy-statement")
    ARTICLE = github_privacy.get_text()
    summary = getTheSummary(ARTICLE)
    summary = summary[0]
    summary_lines = summary['summary_text'].split(".")
    print(summary_lines)
    return {"summary" : summary_lines}

if __name__=='__main__':
    app.run(debug=True)