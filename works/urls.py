from django.contrib import admin
from django.urls import path
from django.views.generic import TemplateView
from works.views import WorksTopView

urlpatterns = [
    path('', WorksTopView.as_view(), name='top'),
]