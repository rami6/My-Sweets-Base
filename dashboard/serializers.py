from rest_framework import serializers
from .models import ShopItem


class ShopItemSerializers(serializers.ModelSerializer):
    owner = serializers.HiddenField(default=serializers.CurrentUserDefault())

    class Meta:
        model = ShopItem
        fields = '__all__'
        