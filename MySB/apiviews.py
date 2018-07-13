from rest_framework import generics, filters

from storage.models import Ingredient
from storage.serializers import IngredientSerializer
from works.models import Recipe, Work
from works.serializers import RecipeSerializer, WorkSerializer
from wishlist.models import WishRecipe, Wish
from wishlist.serializers import WishRecipeSerializer, WishSerializer


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


class WorksSearchAPIView_titleA(generics.ListAPIView):
    queryset = Work.objects.all().order_by('title', 'made_date')
    serializer_class = WorkSerializer
    filter_backends = (filters.SearchFilter,)
    search_fields = ('title',)


class WorksSearchAPIView_titleD(generics.ListAPIView):
    queryset = Work.objects.all().order_by('-title', 'made_date')
    serializer_class = WorkSerializer
    filter_backends = (filters.SearchFilter,)
    search_fields = ('title',)


class WorksSearchAPIView_dateA(generics.ListAPIView):
    queryset = Work.objects.all().order_by('made_date', 'title')
    serializer_class = WorkSerializer
    filter_backends = (filters.SearchFilter,)
    search_fields = ('title',)


class WorksSearchAPIView_dateD(generics.ListAPIView):
    queryset = Work.objects.all().order_by('-made_date', 'title')
    serializer_class = WorkSerializer
    filter_backends = (filters.SearchFilter,)
    search_fields = ('title',)


class RecipeListAPIView(generics.ListAPIView):
    serializer_class = RecipeSerializer

    def get_queryset(self):
        work_related = self.kwargs['work_id']
        return Recipe.objects.filter(work_id=work_related)


class WishlistSearchAPIView_titleA(generics.ListAPIView):
    queryset = Wish.objects.all().order_by('title', 'made_date')
    serializer_class = WishSerializer
    filter_backends = (filters.SearchFilter,)
    search_fields = ('title',)


class WishlistSearchAPIView_titleD(generics.ListAPIView):
    queryset = Wish.objects.all().order_by('-title', 'made_date')
    serializer_class = WishSerializer
    filter_backends = (filters.SearchFilter,)
    search_fields = ('title',)


class WishlistSearchAPIView_dateA(generics.ListAPIView):
    queryset = Wish.objects.all().order_by('made_date', 'title')
    serializer_class = WishSerializer
    filter_backends = (filters.SearchFilter,)
    search_fields = ('title',)


class WishlistSearchAPIView_dateD(generics.ListAPIView):
    queryset = Wish.objects.all().order_by('-created_at', 'title')
    serializer_class = WishSerializer
    filter_backends = (filters.SearchFilter,)
    search_fields = ('title',)


class WishRecipeListAPIView(generics.ListAPIView):
    serializer_class = WishRecipeSerializer

    def get_queryset(self):
        wish_related = self.kwargs['wish_id']
        return WishRecipe.objects.filter(wish_id=wish_related)