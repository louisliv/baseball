# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import models
from django.contrib.auth.models import User

from django.contrib.postgres.fields import JSONField

# Create your models here.

class Scorecard(models.Model):
    game_id = models.IntegerField(editable=False)
    user = models.ForeignKey(User, related_name='scorecards', editable=False)
    complete = models.BooleanField(default=False)
    data = JSONField()