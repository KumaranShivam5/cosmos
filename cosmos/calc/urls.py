from django.contrib import admin
from django.urls import path

from django.urls import include

import calc

#from views import *
from . import views

urlpatterns = [
    #path('admin/', admin.site.urls),
    path('trial/', views.trial_fn),
    #path('get_all/<float:a>/<float:b>/<float:c>/<float:d>/<float:e>' , views.get_all)
    path('get_all/<int:a>' , views.get_all)
]
