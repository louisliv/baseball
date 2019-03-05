from __future__ import unicode_literals

from django.db import models
from django.contrib.auth.models import User

# Create your models here.

class Profile(models.Model):
	user = models.OneToOneField(User, related_name="profile")
	avatar = models.ImageField(blank=True, null=True)

	def __str__(self):
		return '%s %s' % (self.user.first_name, self.user.last_name)