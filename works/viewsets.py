from rest_framework import viewsets
from .models import Work, Recipe
from .serializers import WorkSerializer, RecipeSerializer


class WorkViewSet(viewsets.ModelViewSet):
    queryset = Work.objects.all()
    serializer_class = WorkSerializer


class RecipeViewSet(viewsets.ModelViewSet):
    queryset = Recipe.objects.all()
    serializer_class = RecipeSerializer
