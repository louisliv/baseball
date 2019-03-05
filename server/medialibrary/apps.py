# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.apps import AppConfig
from watson import search as watson


class MedialibraryConfig(AppConfig):
    name = 'medialibrary'

    def ready(self):
        MediaItem = self.get_model("MediaItem")
        watson.register(MediaItem)
