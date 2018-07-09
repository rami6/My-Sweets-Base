from django.contrib import admin
from django.urls import path
from .views import StorageTopView
from django.views.generic import TemplateView

urlpatterns = [
    path('', StorageTopView.as_view(), name='top'),
    path('test/', TemplateView.as_view(template_name='search_test.html')),
]