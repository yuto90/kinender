# Generated by Django 3.2 on 2022-01-08 15:55

import api.models
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0004_alter_postdate_image'),
    ]

    operations = [
        migrations.AlterField(
            model_name='postdate',
            name='image',
            field=models.ImageField(blank=True, upload_to=api.models.PostDate.get_image_path, verbose_name='画像'),
        ),
    ]
