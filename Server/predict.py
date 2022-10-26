import torch
from torchvision.transforms import ToTensor

from PIL import Image
import matplotlib as plt
import cv2
import os
import numpy as np

import sys

def load_model(path):
    
    model_path = os.path.join(path, "model.pt")
    model = torch.load(model_path)
    return model

def predict(path, image_name):
    
    '''image preprocessing'''
    images  = Image.open(image_path).convert('RGB')
    input = ToTensor()(images)
    input = torch.unsqueeze(input, 0)
    
    '''pytorch device'''
    device = torch.device('cuda') if torch.cuda.is_available() else torch.device('cpu')
    model = torch.load('./model.pt', map_location=device)
    input = input.to(device)
    
    '''prediction'''
    model.eval()
    outputs = model(input)
    cpu_device = torch.device("cpu")
    outputs = [{k: v.to(cpu_device) for k, v in t.items()} for t in outputs]
    mask = outputs[0]['scores'] > 0.5
    boxes = outputs[0]["boxes"][mask].detach().numpy().astype(np.int32)
    print(boxes)
    for box in boxes:
        cv2.rectangle(images,
                    (box[0], box[1]),
                    (box[2], box[3]),
                    (220, 0, 0), 1)
        
    return plt.imshow(images)

'''
path는 model.pt랑 image 같이 있는 경로
image_name은 .jpg 포함
'''
path = '/Users/ysyss/Desktop/Server/'
image_path=path+sys.argv[1]
image_name = sys.argv[2]

'''
아래는 건들지 말 것
'''
print('start')

prediction = predict(path, image_name)
print(prediction)
print('end')
