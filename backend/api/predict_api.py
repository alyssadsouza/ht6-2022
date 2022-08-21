import torch
from transformers import AutoModelForSeq2SeqLM, AutoTokenizer, pipeline

tokenizer = AutoTokenizer.from_pretrained("sshleifer/distilbart-cnn-12-6")

def getTheSummary(original_text):
    model = AutoModelForSeq2SeqLM.from_pretrained("sshleifer/distilbart-cnn-12-6")
    checkpoint = torch.load("brownies.pt")
    model.load_state_dict(checkpoint)

    input_ids = tokenizer.encode(original_text, return_tensors='pt', max_length=512, truncation=True)
    output = model.generate(input_ids, max_length=512, early_stopping=True)
    summary = tokenizer.decode(output[0])

    summarizer = pipeline("summarization")
    true_output = summarizer(summary, max_length=512, min_length=30, do_sample=False)
    return true_output