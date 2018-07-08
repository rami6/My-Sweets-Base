from django.shortcuts import render
from django.views.generic import ListView, CreateView, FormView
from .models import Ingredient
from .forms import IngredientCreateForm


class StorageTopView(CreateView):
    template_name = 'storage_top.html'
    form_class = IngredientCreateForm
    success_url = '/storage/'

    def form_valid(self, form):
        instance = form.save(commit=False)
        return super(StorageTopView, self).form_valid(form)

    def get_context_data(self, *args, **kwargs):
        context = super(StorageTopView, self).get_context_data(*args, **kwargs)
        context['object_list'] = Ingredient.objects.all()
        return context