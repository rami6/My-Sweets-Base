# Generated by Django 2.0.6 on 2018-07-11 22:43

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('works', '0008_auto_20180711_1531'),
    ]

    operations = [
        migrations.AlterField(
            model_name='work',
            name='image',
            field=models.ImageField(default='default_image.png', upload_to='work_pic'),
        ),
    ]
