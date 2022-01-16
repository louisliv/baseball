from .models import Scorecard

from rest_framework import serializers
import json

class JSONSerializerField(serializers.Field):
    """ Serializer for JSONField -- required to make field writable"""
    def to_internal_value(self, data):
        return data
    def to_representation(self, value):
        return value

class ScorecardSerializer(serializers.HyperlinkedModelSerializer):
    user = serializers.SerializerMethodField()
    data = serializers.SerializerMethodField()

    class Meta:
        model = Scorecard
        fields = ('id', 'game_id', 'user', 'complete','data')

    def get_user(self, obj):
        return obj.user.id

    def get_data(self, obj):
        return obj.get_data()
