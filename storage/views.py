from django.shortcuts import render
from django.views.generic import ListView
from .models import Ingredient

class StorageTopView(ListView):
    template_name = 'storage_top.html'

    def get_queryset(self):
        return Ingredient.objects.all()
