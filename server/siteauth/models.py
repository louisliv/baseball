from __future__ import unicode_literals

from django.db import models
from django.contrib.auth.models import User

from django.contrib.postgres.fields import ArrayField

# Create your models here.

class Profile(models.Model):
    user = models.OneToOneField(User, related_name="profile")
    avatar = models.ImageField(blank=True, null=True)
    teams = ArrayField(models.IntegerField(blank=True), 
        default=list)

    def __str__(self):
        return '%s %s' % (self.user.first_name, self.user.last_name)

class Todo(models.Model):
    title = models.CharField(max_length=100)
    completed = models.BooleanField(default=False)

    def __str__(self):
        return self.title