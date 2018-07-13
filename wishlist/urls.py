from django.contrib import admin
from django.urls import path
from .views import WishlistTopView

urlpatterns = [
    path('', WishlistTopView.as_view(), name='top'),
]