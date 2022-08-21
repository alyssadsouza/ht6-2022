import html
import site
from googlesearch import search
from bs4 import BeautifulSoup
from dotenv import load_dotenv
import requests, os, json

load_dotenv()

class html_to_text():
    def __init__(self, url):
        self.org_html = requests.get(url)
        self.org_bs4 = BeautifulSoup(self.org_html.text, "html.parser")

    def get_text(self):
        return self.org_bs4.get_text()

# text = []

# for paragraph in soup_object_org.find_all('p'):
#     text.append(paragraph.getText())

# print(text)
