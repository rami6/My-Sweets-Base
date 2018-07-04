from django.db import models
import datetime


class Work(models.Model):
    title       = models.CharField(max_length=120)
    made_date   = models.DateField(default=datetime.date.today, null=True, blank=True)
    note        = models.TextField(max_length=2000)
    picture     = models.ImageField(upload_to='work_pic', blank=True)

    def __str__(self):
        return self.title


class Recipe(models.Model):
    work_id     = models.ForeignKey('Work', on_delete=models.CASCADE)
    url         = models.URLField()
    link_title  = models.CharField(max_length=120, default="Recipe")

    def __str__(self):
        return self.url
