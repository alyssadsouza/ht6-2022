import torch
from transformers import pipeline, AutoModelForSeq2SeqLM, AutoTokenizer
import sys

original_stdout = sys.stdout

model = AutoModelForSeq2SeqLM.from_pretrained("sshleifer/distilbart-cnn-12-6")
checkpoint = torch.load("brownies.pt")
model.load_state_dict(checkpoint)
# print(model.state_dict())

ARTICLE = """
Terms and Conditions of Use Effective as of 2019-02-071 Introduction 2 Changes to the Agreements 3 Enjoying Spotify 4 Payments and cancellations 5 Using our service 6 Third Party Applications and Devices 7 User-Generated Content 8 Rights you grant us 9 User guidelines 10 Infringement and reporting User Content 11 Service limitations and modifications 12 Brand Accounts 13 Spotify Support Community 14 Customer support 15 Export control 16 Term and termination 17 Warranty disclaimer 18 Limitation and time for filing 19 Third party rights 20 Entire agreement 21 Severability, waiver and interpretation 22 Assignment 23 Indemnification 24 Choice of law, mandatory arbitration, and venue 25 Contact usHello, and welcome to the Spotify Terms and Conditions of Use (Terms).
"""

tokenizer = AutoTokenizer.from_pretrained("sshleifer/distilbart-cnn-12-6")

input_ids = tokenizer.encode(ARTICLE, max_length = 512, return_tensors='pt', truncation=True)
output = model.generate(input_ids, max_length = 512, early_stopping=True)
summary = tokenizer.decode(output[0])
print(type(summary))

with open('arnav.txt', 'w') as f:
    sys.stdout = f
    print(summary)
    sys.stdout = original_stdout

summarizer = pipeline("summarization")
print(summarizer(summary, max_length=512, min_length=30, do_sample=False))

def getTheSummary(original_text):
    model = AutoModelForSeq2SeqLM.from_pretrained("sshleifer/distilbart-cnn-12-6")
    checkpoint = torch.load("brownies.pt")
    model.load_state_dict(checkpoint)
    
    input_ids = tokenizer.encode(original_text, return_tensors='pt', max_length=512, truncation=True)
    output = model.generate(input_ids, max_length=512, early_stopping=True)
    summary = tokenizer.decode(output[0])
    return summary