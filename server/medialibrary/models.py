# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import models
from django.contrib.auth.models import User

# Create your models here.
class MediaItem(models.Model):
    VIDEO = 'video'
    AUDIO = 'audio'
    FILE_TYPE_CHOICES = (
        (VIDEO, 'Video'),
        (AUDIO, 'Audio'),
    )
    file_type = models.CharField(
        max_length=5,
        choices=FILE_TYPE_CHOICES,
        default=AUDIO,
    )
    file = models.FileField()
    title = models.CharField(max_length=100)
    poster = models.ImageField(blank=True, null=True)
    uploader = models.ForeignKey(User)
    uploaded_on = models.DateTimeField(auto_now_add=True)
    description = models.TextField(blank=True, null=True)
    loves = models.ManyToManyField(User, blank=True, related_name="media_loves")
    love_count = models.IntegerField(default=0)

    def __str__(self):
        return '%s' % (self.title)

    def save(self, *args, **kwargs):
        if self.pk:
            self.love_count = self.loves.all().count()
        super(MediaItem, self).save(*args, **kwargs)

class VideoSubtitle(models.Model):
    label = models.CharField(max_length=100)
    source_language = models.CharField(max_length=100)
    media_item = models.ForeignKey(
        MediaItem,
        related_name='subtitles',
        limit_choices_to={'file_type': MediaItem.VIDEO},
    )
    file = models.FileField()

    def __str__(self):
        return '%s: %s' % (self.media_item.title, self.label)

class Comment(models.Model):
    user = models.ForeignKey(User, related_name='comments')
    commented_on = models.DateTimeField(auto_now_add=True)
    text = models.TextField()
    media_item = models.ForeignKey(MediaItem, related_name='comments')
    publish = models.BooleanField(default=True)
    loves = models.ManyToManyField(User, blank=True, related_name="comment_loves")

    def __str__(self):
        return '%s\'s comment on %s' % (self.user.username, self.media_item.title) 