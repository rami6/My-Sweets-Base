# Generated by Django 2.0.6 on 2018-07-23 04:40

import datetime
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('storage', '0005_auto_20180720_1459'),
    ]

    operations = [
        migrations.AlterField(
            model_name='ingredient',
            name='expiration_date',
            field=models.DateField(blank=True, default=datetime.date.today, null=True),
        ),
    ]
