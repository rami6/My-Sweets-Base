from rest_framework import viewsets
from .models import Wish, WishRecipe
from .serializers import WishSerializer, WishRecipeSerializer


class WishViewSet(viewsets.ModelViewSet):
    queryset = Wish.objects.all()
    serializer_class = WishSerializer

    def partial_update(self, request, *args, **kwargs):
        kwargs['partial'] = True
        return self.update(request, *args, **kwargs)
    

class WishRecipeViewSet(viewsets.ModelViewSet):
    queryset = WishRecipe.objects.all()
    serializer_class = WishRecipeSerializer
