from rest_framework import routers
from works.viewsets import WorkViewSet, RecipeViewSet
from storage.viewsets import IngredientViewSet
from wishlist.viewsets import WishViewSet, WishRecipeViewSet
from dashboard.viewsets import ShopItemViewSet


router = routers.DefaultRouter()
router.register(r'work', WorkViewSet)
router.register(r'recipe', RecipeViewSet)
router.register(r'ingredient', IngredientViewSet)
router.register(r'wish', WishViewSet)
router.register(r'wish-recipe', WishRecipeViewSet)
router.register(r'shopitem', ShopItemViewSet, base_name='shopitem')
