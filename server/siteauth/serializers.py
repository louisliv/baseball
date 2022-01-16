from rest_framework import serializers
from .models import Profile


class ProfileSerializer(serializers.ModelSerializer):
    email = serializers.SerializerMethodField()
    username = serializers.SerializerMethodField()
    first_name = serializers.SerializerMethodField()
    last_name = serializers.SerializerMethodField()
    user = serializers.SerializerMethodField()
    avatar = serializers.SerializerMethodField()
    teams = serializers.ListField(child=serializers.IntegerField())

    class Meta:
        model = Profile
        fields = ('id', 'email', 'username', 'first_name',
                  'last_name', 'user', 'avatar', 'teams')

    def get_user(self, obj):
        return obj.user.id

    def get_email(self, obj):
        return obj.user.email

    def get_username(self, obj):
        return obj.user.username

    def get_first_name(self, obj):
        return obj.user.first_name

    def get_last_name(self, obj):
        return obj.user.last_name

    def get_avatar(self, obj):
        try:
            url = obj.avatar.url
            return url
        except:
            return None
