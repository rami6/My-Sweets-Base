from rest_framework import routers
from works.viewsets import WorkViewSet
router = routers.DefaultRouter()
router.register(r'work', WorkViewSet)