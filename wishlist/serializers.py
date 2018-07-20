from rest_framework import serializers
from .models import Wish, WishRecipe


class WishSerializer(serializers.ModelSerializer):
    owner = serializers.HiddenField(default=serializers.CurrentUserDefault())

    class Meta:
        model = Wish
        fields = ('id', 'owner', 'title', 'image', 'created_at', 'note', 'date_created')


class WishRecipeSerializer(serializers.ModelSerializer):
    class Meta:
        model = WishRecipe
        fields = '__all__'
