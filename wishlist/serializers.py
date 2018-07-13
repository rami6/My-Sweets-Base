from rest_framework import serializers
from .models import Wish, WishRecipe


class WishSerializer(serializers.ModelSerializer):
    class Meta:
        model = Wish
        fields = ('id', 'title', 'image', 'created_at', 'note', 'date_created')


class WishRecipeSerializer(serializers.ModelSerializer):
    class Meta:
        model = WishRecipe
        fields = '__all__'
