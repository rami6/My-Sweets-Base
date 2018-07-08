from django.db import models
from datetime import date


class Ingredient(models.Model):
    name            = models.CharField(max_length=120)
    expiration_date = models.DateField(null=True, blank=True)

    def __str__(self):
        return self.name

    @property
    def is_expired(self):
        return date.today() > self.expiration_date