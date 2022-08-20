import torch
from transformers import pipeline, AutoTokenizer, AutoModelForSeq2SeqLM, AutoModelForTokenClassification, TrainingArguments, Trainer
from datasets import load_dataset
import sys

tokenizer = AutoTokenizer.from_pretrained("sshleifer/distilbart-cnn-12-6")
summarization_model = AutoModelForSeq2SeqLM.from_pretrained("sshleifer/distilbart-cnn-12-6")

training_args = TrainingArguments(output_dir='test_trainer', evaluation_strategy='epoch')

dataset = load_dataset("csv", data_files="propdata.csv")

# split data
train_docs, train_labels = dataset['train']['documents'], dataset['train']['summary']
train_docs = [doc for doc in train_docs if doc is not None]
train_labels = [label for label in train_labels if label is not None]

train_encodings = tokenizer(train_docs, truncation=True, padding=True)
train_label_encodings = tokenizer(train_labels, truncation=True, padding=True)

class PyTorchDatasetCreate(torch.utils.data.Dataset):
    def __init__(self, encodings, labels):
        self.encodings = encodings
        self.labels = labels

    def __getitem__(self, idx):
        item = {"encodings": torch.Tensor(self.encodings[idx])}
        item['labels'] = torch.LongTensor([self.labels[idx]])
        return item

    def __len__(self):
        return len(self.labels)

train_dataset = PyTorchDatasetCreate(train_encodings, train_label_encodings)

original_stdout = sys.stdout # Save a reference to the original standard output

trainer = Trainer(
    model = summarization_model,
    args = training_args,
    train_dataset = train_dataset
)

# print(type(dataset['train']))
# print(type(dataset))
# print(dataset)
# with open('brownies.txt', 'w') as f:
#     sys.stdout = f
#     print(dataset.data)
#     sys.stdout = original_stdout

print(train_dataset)

trainer.train()