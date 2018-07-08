from django.contrib import admin
from django.urls import path
from .views import StorageTopView

urlpatterns = [
    path('', StorageTopView.as_view(), name='top'),
]