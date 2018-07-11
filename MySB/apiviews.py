from rest_framework import generics, filters

from storage.models import Ingredient
from storage.serializers import IngredientSerializer
from works.models import Recipe
from works.serializers import RecipeSerializer


class StorageSearchAPIView_expirationA(generics.ListAPIView):
    queryset = Ingredient.objects.all().order_by('expiration_date', 'name')
    serializer_class = IngredientSerializer
    filter_backends = (filters.SearchFilter,)
    search_fields = ('name',)


class StorageSearchAPIView_expirationD(generics.ListAPIView):
    queryset = Ingredient.objects.all().order_by('-expiration_date', 'name')
    serializer_class = IngredientSerializer
    filter_backends = (filters.SearchFilter,)
    search_fields = ('name',)


class StorageSearchAPIView_nameA(generics.ListAPIView):
    queryset = Ingredient.objects.all().order_by('name', 'expiration_date')
    serializer_class = IngredientSerializer
    filter_backends = (filters.SearchFilter,)
    search_fields = ('name',)


class StorageSearchAPIView_nameD(generics.ListAPIView):
    queryset = Ingredient.objects.all().order_by('-name', 'expiration_date')
    serializer_class = IngredientSerializer
    filter_backends = (filters.SearchFilter,)
    search_fields = ('name',)


class RecipeListAPIView(generics.ListAPIView):
    serializer_class = RecipeSerializer

    def get_queryset(self):
        work_related = self.kwargs['work_id']
        return Recipe.objects.filter(work_id=work_related)
