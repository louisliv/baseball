# -*- coding: utf-8 -*-
# Generated by Django 1.11.6 on 2019-04-12 03:48
from __future__ import unicode_literals

import django.contrib.postgres.fields.jsonb
from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('scorebook', '0002_auto_20190411_1617'),
    ]

    operations = [
        migrations.AlterField(
            model_name='scorecard',
            name='data',
            field=django.contrib.postgres.fields.jsonb.JSONField(),
        ),
    ]