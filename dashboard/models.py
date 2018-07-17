from django.db import models


class ShopItem(models.Model):
    name = models.CharField(max_length=120)
    amount = models.CharField(max_length=100, null=True, blank=True)
    is_bought = models.BooleanField(default=False)

    def __str__(self):
        return self.name
