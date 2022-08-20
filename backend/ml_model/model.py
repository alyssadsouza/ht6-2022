import torch
from transformers import pipeline, AutoTokenizer, AutoModelForSeq2SeqLM, AutoModelForTokenClassification, TrainingArguments, Trainer
from datasets import load_dataset

tokenizer = AutoTokenizer.from_pretrained("sshleifer/distilbart-cnn-12-6")
summarization_model = AutoModelForSeq2SeqLM.from_pretrained("sshleifer/distilbart-cnn-12-6")

training_args = TrainingArguments(output_dir='test_trainer', evaluation_strategy='epoch')

dataset = load_dataset("csv", data_files="propdata.csv")

trainer = Trainer(
    model = summarization_model,
    args = training_args,
    train_dataset = dataset['train']
)

print(dataset)

# trainer.train()