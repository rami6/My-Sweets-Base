from rest_framework import viewsets
from .models import ShopItem
from .serializers import ShopItemSerializers


class ShopItemViewSet(viewsets.ModelViewSet):
    queryset = ShopItem.objects.all()
    serializer_class = ShopItemSerializers
