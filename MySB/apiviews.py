from rest_framework import generics, filters
from django.db.models import F

from storage.models import Ingredient
from storage.serializers import IngredientSerializer
from works.models import Recipe, Work
from works.serializers import RecipeSerializer, WorkSerializer
from wishlist.models import WishRecipe, Wish
from wishlist.serializers import WishRecipeSerializer, WishSerializer


class StorageSearchAPIView_expirationA(generics.ListAPIView):
    serializer_class = IngredientSerializer
    filter_backends = (filters.SearchFilter,)
    search_fields = ('name',)

    def get_queryset(self):
        return Ingredient.objects.filter(owner=self.request.user).order_by(F('expiration_date').asc(nulls_last=True), 'name')


class StorageSearchAPIView_expirationD(generics.ListAPIView):
    serializer_class = IngredientSerializer
    filter_backends = (filters.SearchFilter,)
    search_fields = ('name',)

    def get_queryset(self):
        return Ingredient.objects.filter(owner=self.request.user).order_by(F('expiration_date').desc(nulls_first=True), 'name')


class StorageSearchAPIView_nameA(generics.ListAPIView):
    serializer_class = IngredientSerializer
    filter_backends = (filters.SearchFilter,)
    search_fields = ('name',)

    def get_queryset(self):
        return Ingredient.objects.filter(owner=self.request.user).order_by('name', F('expiration_date').asc(nulls_last=True))


class StorageSearchAPIView_nameD(generics.ListAPIView):
    serializer_class = IngredientSerializer
    filter_backends = (filters.SearchFilter,)
    search_fields = ('name',)

    def get_queryset(self):
        return Ingredient.objects.filter(owner=self.request.user).order_by('-name', F('expiration_date').asc(nulls_last=True))


class WorksSearchAPIView_titleA(generics.ListAPIView):
    serializer_class = WorkSerializer
    filter_backends = (filters.SearchFilter,)
    search_fields = ('title',)

    def get_queryset(self):
        return Work.objects.filter(owner=self.request.user).order_by('title', 'made_date')


class WorksSearchAPIView_titleD(generics.ListAPIView):
    serializer_class = WorkSerializer
    filter_backends = (filters.SearchFilter,)
    search_fields = ('title',)

    def get_queryset(self):
        return Work.objects.filter(owner=self.request.user).order_by('-title', 'made_date')

class WorksSearchAPIView_dateA(generics.ListAPIView):
    serializer_class = WorkSerializer
    filter_backends = (filters.SearchFilter,)
    search_fields = ('title',)

    def get_queryset(self):
        return Work.objects.filter(owner=self.request.user).order_by('made_date', 'title')


class WorksSearchAPIView_dateD(generics.ListAPIView):
    serializer_class = WorkSerializer
    filter_backends = (filters.SearchFilter,)
    search_fields = ('title',)

    def get_queryset(self):
        return Work.objects.filter(owner=self.request.user).order_by('-made_date', 'title')


class RecipeListAPIView(generics.ListAPIView):
    serializer_class = RecipeSerializer

    def get_queryset(self):
        work_related = self.kwargs['work_id']
        return Recipe.objects.filter(work_id=work_related)


class WishlistSearchAPIView_titleA(generics.ListAPIView):
    serializer_class = WishSerializer
    filter_backends = (filters.SearchFilter,)
    search_fields = ('title',)

    def get_queryset(self):
        return Wish.objects.filter(owner=self.request.user).order_by('title', 'created_at')


class WishlistSearchAPIView_titleD(generics.ListAPIView):
    serializer_class = WishSerializer
    filter_backends = (filters.SearchFilter,)
    search_fields = ('title',)

    def get_queryset(self):
        return Wish.objects.filter(owner=self.request.user).order_by('-title', 'created_at')


class WishlistSearchAPIView_dateA(generics.ListAPIView):
    serializer_class = WishSerializer
    filter_backends = (filters.SearchFilter,)
    search_fields = ('title',)

    def get_queryset(self):
        return Wish.objects.filter(owner=self.request.user).order_by('created_at', 'title')


class WishlistSearchAPIView_dateD(generics.ListAPIView):
    serializer_class = WishSerializer
    filter_backends = (filters.SearchFilter,)
    search_fields = ('title',)

    def get_queryset(self):
        return Wish.objects.filter(owner=self.request.user).order_by('-created_at', 'title')


class WishRecipeListAPIView(generics.ListAPIView):
    serializer_class = WishRecipeSerializer

    def get_queryset(self):
        wish_related = self.kwargs['wish_id']
        return WishRecipe.objects.filter(wish_id=wish_related)