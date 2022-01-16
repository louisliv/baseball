from __future__ import unicode_literals

from django.db import models
from django.contrib.auth.models import User

from django.contrib.postgres.fields import ArrayField

# Create your models here.

class Profile(models.Model):
    user = models.OneToOneField(User, related_name="profile", on_delete=models.CASCADE)
    avatar = models.ImageField(blank=True, null=True)
    teams = ArrayField(models.IntegerField(blank=True), 
        default=list, blank=True, null=True)

    def __str__(self):
        return self.user.username
