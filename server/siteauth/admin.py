from django.contrib import admin
from django.contrib.sessions.models import Session
from .models import Profile

# Register your models here.
admin.site.register(Profile)
admin.site.register(Session)