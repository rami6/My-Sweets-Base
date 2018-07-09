from rest_framework import routers
from works.viewsets import WorkViewSet
from storage.viewsets import IngredientViewSet


router = routers.DefaultRouter()
router.register(r'work', WorkViewSet)
router.register(r'ingredient', IngredientViewSet)