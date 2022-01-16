# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import models
from django.contrib.auth.models import User

from django.contrib.postgres.fields import JSONField
import boto3, json

# Create your models here.

class Scorecard(models.Model):
    game_id = models.IntegerField(editable=False)
    user = models.ForeignKey(User, related_name='scorecards', editable=False, on_delete=models.CASCADE)
    complete = models.BooleanField(default=False)

    def get_data(self):
        s3 = boto3.resource("s3")

        obj = s3.Object("gamescore-scorecard-data", f"{self.id}/data.json")
        data = json.load(obj.get()['Body'])

        return data
