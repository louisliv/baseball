# -*- coding: utf-8 -*-
# Generated by Django 1.10 on 2018-10-10 19:07
from __future__ import unicode_literals

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('siteauth', '0001_initial'),
    ]

    operations = [
        migrations.AddField(
            model_name='profile',
            name='avatar',
            field=models.ImageField(blank=True, null=True, upload_to=b''),
        ),
    ]
