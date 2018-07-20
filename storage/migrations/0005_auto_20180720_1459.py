# Generated by Django 2.0.6 on 2018-07-20 21:59

from django.conf import settings
from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('storage', '0004_auto_20180720_1420'),
    ]

    operations = [
        migrations.AlterField(
            model_name='ingredient',
            name='owner',
            field=models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.CASCADE, to=settings.AUTH_USER_MODEL),
        ),
    ]