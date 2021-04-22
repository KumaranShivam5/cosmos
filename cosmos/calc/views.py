from django.shortcuts import render
from rest_framework.decorators import api_view , permission_classes , parser_classes
from rest_framework.response import Response


from . import models
#from . import serializer
# Create your views here.

import numpy as np 
from matplotlib import pyplot as plt 
import io
import urllib , base64

from .cosmos_func import show


@api_view(['GET'])
def trial_fn(request):
    #fh = models.forumCategory.objects.all()
    #fh_s = serializer.forumCtgSerializer(fh, many=True)
    data = np.random.normal(0,1)
    plt.plot(data)
    fig = plt.gcf()
    buffer = io.BytesIO()
    fig.savefig(buffer , format='png')
    buffer.seek(0)
    string = base64.b64encode(buffer.read())
    uri = urllib.parse.quote(string)
    return Response(uri)

@api_view(['GET'])
def get_all(request):
    val = show(1,0.3,0.0,0,0.7)
    data = {
        "age" : val[0],
        "loock_back" : val[1],
        "ang_dia" : val[2],
        "lum_dist" :val[3],
        "com_dist" : val[4],
        "H_val" : val[5] ,
        "cmb" :val[6]
    }
    #data = {'neme':'name is ' , 'roll' :10}
    return Response(data)
