# Generated by Django 2.0.6 on 2018-07-05 18:13

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('works', '0003_auto_20180705_1050'),
    ]

    operations = [
        migrations.AlterField(
            model_name='work',
            name='note',
            field=models.TextField(blank=True, max_length=2000, null=True),
        ),
    ]
