# -*- coding: utf-8 -*-
# Generated by Django 1.11.6 on 2019-03-06 02:52
from __future__ import unicode_literals

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('baseball', '0002_auto_20190306_0156'),
    ]

    operations = [
        migrations.AlterField(
            model_name='player',
            name='debut',
            field=models.DateField(blank=True, null=True),
        ),
        migrations.AlterField(
            model_name='player',
            name='final_game',
            field=models.DateField(blank=True, null=True),
        ),
    ]