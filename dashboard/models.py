from django.db import models
from django.conf import settings


# Model for items of shopping list. Other data to show in the dashboard is brought from other modules.
class ShopItem(models.Model):
    owner = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE, null=True, blank=True)
    name = models.CharField(max_length=120)
    amount = models.CharField(max_length=100, null=True, blank=True)
    is_bought = models.BooleanField(default=False)

    def __str__(self):
        return self.name
