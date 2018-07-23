from django.conf import settings
from django.db import models
from datetime import date


class Ingredient(models.Model):
    owner           = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE, null=True, blank=True)
    name            = models.CharField(max_length=120)
    expiration_date = models.DateField(default=date.today, null=True, blank=True)

    def __str__(self):
        return self.name

    @property
    def is_expired(self):
        if self.expiration_date is None:
            return False
        else:
            return date.today() > self.expiration_date