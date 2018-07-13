import os

from django.db import models
from django.db.models.signals import post_save
from django.dispatch import receiver
from django.conf import settings

from .utilities.utils import rotate_image


class Wish(models.Model):
    title       = models.CharField(max_length=120)
    created_at  = models.DateTimeField(auto_now_add=True)
    note        = models.TextField(max_length=2000, null=True, blank=True)
    image       = models.ImageField(upload_to='wishlist_pic', default='default_image.png')

    def __str__(self):
        return self.title

    @property
    def date_created(self):
        return self.created_at.strftime("%Y-%m-%d")


@receiver(post_save, sender=Wish, dispatch_uid="update_image_wishlist")
def update_image(sender, instance, **kwargs):
  if instance.image:
    fullpath = settings.BASE_DIR + "/MySB" + instance.image.url
    rotate_image(fullpath)


class WishRecipe(models.Model):
    wish_id     = models.ForeignKey('Wish', on_delete=models.CASCADE)
    url         = models.URLField()
    link_title  = models.CharField(max_length=120, default="Recipe")

    def __str__(self):
        return self.url