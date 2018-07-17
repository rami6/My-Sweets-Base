from rest_framework import serializers
from .models import ShopItem


class ShopItemSerializers(serializers.ModelSerializer):
    class Meta:
        model = ShopItem
        fields = '__all__'
        