# Generated by Django 2.0.6 on 2018-07-04 21:28

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('works', '0001_initial'),
    ]

    operations = [
        migrations.AddField(
            model_name='recipe',
            name='link_title',
            field=models.CharField(default='Recipe', max_length=120),
        ),
        migrations.AlterField(
            model_name='work',
            name='note',
            field=models.TextField(max_length=2000),
        ),
    ]