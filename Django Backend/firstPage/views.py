from django.shortcuts import render
from django.http import JsonResponse

#To accept files in POST request
from django.core.files.storage import FileSystemStorage
import pandas as pd

import json
# Create your views here.

import joblib
model=joblib.load('modelPipeline.pkl')

def scoreJson(request):
    # print(request.body)
    data=json.loads(request.body)
    # print(data)
    #x:data is for indexing
    dataF=pd.DataFrame({'x':data}).transpose()

    score=model.predict_proba(dataF)[:,-1][0]
    score=float(score)*100
    print(score)
    return JsonResponse({'score':score})


#POST request involving upload
def scoreFile(request):
    fileObj=request.FILES['filePath']
    fs=FileSystemStorage()
    filePathName=fs.save(fileObj.name,fileObj)
    filePathName=fs.url(filePathName)
    input_file='.'+filePathName

    data=pd.read_csv(input_file)
    score=model.predict_proba(data)[:,-1]
    score={j:k for j,k in zip(data['Loan_ID'],score)}

    score=sorted(score.items(),key=lambda x:x[1],reverse=True)


    return JsonResponse({'result': score})