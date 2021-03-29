from django.contrib import admin
from django.urls import path

from django.urls import include

import calc

#from views import *
from . import views

urlpatterns = [
    #path('admin/', admin.site.urls),
    path('trial/', views.trial_fn),
]
