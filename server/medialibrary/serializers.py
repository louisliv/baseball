from .models import MediaItem, VideoSubtitle, Comment
from siteauth.models import Profile
from siteauth.serializers import ProfileSerializer
from rest_framework import serializers
from rest_framework.fields import CurrentUserDefault
import sys

class VideoSubtitleSerializer(serializers.HyperlinkedModelSerializer):
    url = serializers.SerializerMethodField()

    class Meta:
        model = VideoSubtitle
        fields = ('id', 'source_language', 'label', 'url')

    def get_url(self, obj):
        try:
            url = obj.file.url
            return url
        except:
            return None


class MediaItemSerializer(serializers.HyperlinkedModelSerializer):
    url = serializers.SerializerMethodField()
    subtitles = VideoSubtitleSerializer(many=True)
    poster = serializers.SerializerMethodField()
    uploader = serializers.SerializerMethodField()
    love_count = serializers.IntegerField(read_only=True)
    user_loves = serializers.SerializerMethodField()

    class Meta:
        model = MediaItem
        fields = ('id', 'file_type', 'title', 'url', 
                  'subtitles', 'poster', 'uploader',
                  'uploaded_on', 'description', 'love_count',
                  'user_loves')

    def get_url(self, obj):
        try:
            url = obj.file.url
            return url
        except:
            return None
    
    def get_poster(self, obj):
        try:
            url = obj.poster.url
            return url
        except:
            return None

    def get_uploader(self, obj):
        profile = Profile.objects.get(user=obj.uploader)
        return ProfileSerializer(profile).data

    def get_user_loves(self, obj):
        request = self.context.get("request")
        if request and hasattr(request, "user"):
            user = request.user
            
            if obj.loves.filter(pk=user.pk).exists():
                return True
            
            return False

class CommentSerializer(serializers.HyperlinkedModelSerializer):
    media_item = serializers.PrimaryKeyRelatedField(read_only=True)
    user = serializers.SerializerMethodField(read_only=True)
    publish = serializers.BooleanField(read_only=True)
    love_count = serializers.SerializerMethodField(read_only=True)
    user_loves = serializers.SerializerMethodField()

    class Meta:
        model = Comment
        fields = ('id', 'media_item', 'text', 'user',
               'publish', 'commented_on', 'love_count',
               'user_loves')

    def get_user(self, obj):
        profile = Profile.objects.get(user=obj.user)
        return ProfileSerializer(profile).data

    def get_love_count(self, obj):
        return obj.loves.all().count()

    def get_user_loves(self, obj):
        request = self.context.get("request")
        if request and hasattr(request, "user"):
            user = request.user
            
            if obj.loves.filter(pk=user.pk).exists():
                return True
            
            return False
