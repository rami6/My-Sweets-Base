from django.shortcuts import render
from django.views.generic import TemplateView, ListView
from django.contrib.auth.mixins import LoginRequiredMixin

from .models import Wish, WishRecipe

class WishlistTopView(ListView):
    template_name = 'wishlist_top.html'

    def get_queryset(self):
        return Wish.objects.all().prefetch_related('recipe_set')
