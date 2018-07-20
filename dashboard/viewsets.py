from rest_framework import viewsets
from .models import ShopItem
from .serializers import ShopItemSerializers


class ShopItemViewSet(viewsets.ModelViewSet):
    serializer_class = ShopItemSerializers

    def get_queryset(self):
        return ShopItem.objects.filter(owner=self.request.user)
