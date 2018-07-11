import os

from django.db import models
from django.db.models.signals import post_save
from django.dispatch import receiver
from django.conf import settings

from .utilities.utils import rotate_image
import datetime


class Work(models.Model):
    title       = models.CharField(max_length=120)
    made_date   = models.DateField(default=datetime.date.today, null=True, blank=True)
    note        = models.TextField(max_length=2000, null=True, blank=True)
    image       = models.ImageField(upload_to='work_pic', default='default_image.png')

    def __str__(self):
        return self.title

@receiver(post_save, sender=Work, dispatch_uid="update_image_work")
def update_image(sender, instance, **kwargs):
  if instance.image:
    fullpath = settings.BASE_DIR + "/MySB" + instance.image.url
    rotate_image(fullpath)


class Recipe(models.Model):
    work_id     = models.ForeignKey('Work', on_delete=models.CASCADE)
    url         = models.URLField()
    link_title  = models.CharField(max_length=120, default="Recipe")

    def __str__(self):
        return self.url
