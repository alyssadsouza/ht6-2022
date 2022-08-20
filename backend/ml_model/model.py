import torch
from transformers import pipeline, AutoTokenizer, AutoModelForSeq2SeqLM, AutoModelForTokenClassification, TrainingArguments, Trainer
from torch.utils.data import Dataset, DataLoader
from datasets import load_dataset
import sys

tokenizer = AutoTokenizer.from_pretrained("sshleifer/distilbart-cnn-12-6")
summarization_model = AutoModelForSeq2SeqLM.from_pretrained("sshleifer/distilbart-cnn-12-6")

training_args = TrainingArguments(output_dir='test_trainer', evaluation_strategy='epoch', num_train_epochs=3)

dataset = load_dataset("csv", data_files="propdata.csv")

# split data
train_docs, train_labels, train_ids = dataset['train']['documents'], dataset['train']['summary'], dataset['train']['id']
train_docs = [doc for doc in train_docs if doc is not None]
train_labels = [label for label in train_labels if label is not None]

train_encodings = tokenizer(train_docs, truncation=True, padding=True)
train_label_encodings = tokenizer(train_labels, truncation=True, padding=True)

class PyTorchDatasetCreate(Dataset):
    def __init__(self, encodings, labels):
        self.encodings = encodings
        self.labels = labels
        # self.ids = ids

    def __getitem__(self, idx):
        return {'input_ids': self.encodings['input_ids'][idx], 'labels': self.labels['input_ids'][idx]}

    def __len__(self):
        return len(self.labels)

train_dataset = PyTorchDatasetCreate(train_encodings, train_label_encodings)

# for key, val in train_label_encodings.items():
#     print(type(val[1]))
#     print(val[1])
#     break

original_stdout = sys.stdout # Save a reference to the original standard output

trainer = Trainer(
    model = summarization_model,
    args = training_args,
    train_dataset = train_dataset,
    eval_dataset = train_dataset,
    tokenizer = tokenizer
)

# with open('brownies.txt', 'w') as f:
#     sys.stdout = f
#     print(dataset.data)
#     sys.stdout = original_stdout

# print(train_dataset.labels)


# with open('brownies-20.txt', 'w') as f:
#     sys.stdout = f
#     print(summarization_model.state_dict())
#     sys.stdout = original_stdout

# torch.save(summarization_model.state_dict(), "not-brownies-20.pt")

trainer.train()

with open('not-brownies-3.txt', 'w') as f:
    sys.stdout = f
    print(summarization_model.state_dict())
    sys.stdout = original_stdout

torch.save(summarization_model.state_dict(), "brownies-3.pt")