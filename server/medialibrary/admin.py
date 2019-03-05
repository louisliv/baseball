# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.contrib import admin
from .models import MediaItem, VideoSubtitle, Comment

# Register your models here.
admin.site.register(MediaItem)
admin.site.register(VideoSubtitle)
admin.site.register(Comment)