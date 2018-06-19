from django.contrib import admin
from django.urls import path
from django.views.generic import TemplateView
from works.views import WorkTopView

urlpatterns = [
    path('', WorkTopView.as_view(), name='top'),
]