from django.db import models
from django.conf import settings
from PIL import Image as Img
from PIL import ExifTags
from io import BytesIO
from django.core.files import File
import datetime
import types


class Work(models.Model):
    owner       = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE, null=True, blank=True)
    title       = models.CharField(max_length=120)
    made_date   = models.DateField(default=datetime.date.today, null=True, blank=True)
    note        = models.TextField(max_length=2000, null=True, blank=True)
    image       = models.ImageField(upload_to='work_pic', default='default_image.png')

    def __str__(self):
        return self.title

    def save(self, *args, **kwargs):
        if not self.id:
            self.set_image()
        else:
            this = Work.objects.get(id=self.id)
            if this.image != self.image:
                self.set_image()
        return super(Work, self).save(*args, **kwargs)

    # Rotate image before save depends on EXIF tag
    def set_image(self, *args, **kwargs):
        if self.image and self.image.name.lower().endswith(('.jpg', '.jpeg')):
            pilImage = Img.open(BytesIO(self.image.read()))
            for orientation in ExifTags.TAGS.keys():
                if ExifTags.TAGS[orientation] == 'Orientation':
                    break
            exif = dict(pilImage._getexif().items())

            if exif[orientation] == 3:
                pilImage = pilImage.rotate(180, expand=True)
            elif exif[orientation] == 6:
                pilImage = pilImage.rotate(270, expand=True)
            elif exif[orientation] == 8:
                pilImage = pilImage.rotate(90, expand=True)

            output = BytesIO()
            pilImage.save(output, format='JPEG', quality=75)
            output.seek(0)
            self.image = File(output, self.image.name)


class Recipe(models.Model):
    owner       = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE, null=True, blank=True)
    work_id     = models.ForeignKey('Work', on_delete=models.CASCADE)
    url         = models.URLField()
    link_title  = models.CharField(max_length=120, default="Recipe")

    def __str__(self):
        return self.url
