from rest_framework import serializers
from .models import Work, Recipe


class WorkSerializer(serializers.ModelSerializer):
    owner = serializers.HiddenField(default=serializers.CurrentUserDefault())

    class Meta:
        model = Work
        fields = '__all__'

    def create(self, validated_data):
        return Work.objects.create(**validated_data)


class RecipeSerializer(serializers.ModelSerializer):
    class Meta:
        model = Recipe
        fields = '__all__'
