# Generated by Django 2.0.6 on 2018-07-20 21:20

from django.conf import settings
from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('storage', '0003_ingredient_owner'),
    ]

    operations = [
        migrations.AlterField(
            model_name='ingredient',
            name='owner',
            field=models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to=settings.AUTH_USER_MODEL),
        ),
    ]