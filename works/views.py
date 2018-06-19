from django.shortcuts import render
from django.views.generic import TemplateView

class WorkTopView(TemplateView):
    template_name = 'works_top.html'