from .models import Scorecard

from rest_framework import serializers

class ScorecardSerializer(serializers.HyperlinkedModelSerializer):
    user = serializers.SerializerMethodField()
    data = serializers.JSONField()

    class Meta:
        model = Scorecard
        fields = ('game_id', 'user', 'complete','data')

    def get_user(self, obj):
        return obj.user.id