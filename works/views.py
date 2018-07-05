from django.shortcuts import render
from django.views.generic import TemplateView, ListView
from django.contrib.auth.mixins import LoginRequiredMixin

from .models import Work, Recipe

class WorksTopView(ListView):
    template_name = 'works_top.html'

    def get_queryset(self):
        return Work.objects.all().prefetch_related('recipe_set')
