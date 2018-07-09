from storage.models import Ingredient
from rest_framework import generics, filters
from storage.serializers import IngredientSerializer


class StorageSearchAPIView(generics.ListAPIView):
    queryset = Ingredient.objects.all().order_by('expiration_date', 'name')
    serializer_class = IngredientSerializer
    filter_backends = (filters.SearchFilter,)
    search_fields = ('name',)
