import torch
import torchvision
from torch.utils.data import Dataset, DataLoader
import numpy as np
import math

class SummarizationDataset(Dataset):

    def __init__(self):

        xy = np.loadtxt('firstline.csv', delimiter='>', dtype=np.string_)
        self.x = torch.from_numpy(xy[:, 0])
        self.y = torch.from_numpy(xy[:, 1])
        self.n_samples = xy.shape[0]
        print(f"SELF.X: {self.x}\n")
        print(f"SELF.Y: {self.y}\n")
        print(f"SIZE: {self.n_samples}\n")

    def __getitem__(self, index):
        return self.x[index], self.y[index]

    def __len__(self):
        return self.n_samples
    
dataset = SummarizationDataset()
    