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
