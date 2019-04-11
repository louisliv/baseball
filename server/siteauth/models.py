from __future__ import unicode_literals

from django.db import models
from django.contrib.auth.models import User

from jsonfield import JSONField

# Create your models here.

class Profile(models.Model):
    user = models.OneToOneField(User, related_name="profile")
    avatar = models.ImageField(blank=True, null=True)
    teams = models.TextField(default='', blank=True, null=True)

    def __str__(self):
        return '%s %s' % (self.user.first_name, self.user.last_name)

    def get_teams(self):
        if self.teams is '':
            return []
        return map(int, self.teams.split(','))

    def set_teams(self, team_list):
        set_string = ''

        for index, team_id in enumerate(team_list):
            if index is 0:
                set_string = set_string + str(team_id)
            else:
                set_string = set_string + ',' + str(team_id)
        
        self.teams = set_string
        return True

class Todo(models.Model):
    title = models.CharField(max_length=100)
    completed = models.BooleanField(default=False)

    def __str__(self):
        return self.title