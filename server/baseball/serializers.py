from .models import (League, Division, Team,
    Team40ManRoster, Player, PlayerStats)

from rest_framework import serializers
import json

class TeamSerializer(serializers.HyperlinkedModelSerializer):

    class Meta:
        model = Team
        fields = ('address_city', 'address_country', 
            'address_line1', 'address_line2', 
            'address_line3', 'address_province', 
            'address_state', 'address_zip', 'base_url', 
            'bis_team_code', 'city', 'franchise_code', 
            'mlb_org', 'mlb_org_id', 'team_id', 'venue_name', 
            'website_url')

class DivisionSerializer(serializers.HyperlinkedModelSerializer):
    teams = TeamSerializer(many=True)

    class Meta:
        model = Division
        fields = ('division_id', 'name', 'abbreviation', 
            'teams')

class LeagueSerializer(serializers.HyperlinkedModelSerializer):
    logo_url = serializers.SerializerMethodField()

    class Meta:
        model = League
        fields = ('league_id', 'name', 'abbreviation', 
            'logo_url')

    def get_logo_url(self, obj):
        try:
            url = obj.logo.url
            return url
        except:
            return None

class PlayerSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = Player
        fields = ('birth_country', 'weight', 'birth_state', 
            'height_inches', 'bats', 'name_first', 
            'birth_city', 'height_feet', 'pro_debut_date', 
            'birth_date', 'throws', 'position', 'name_use', 
            'player_id', 'name_last', 'service_years')

class Team40ManRosterSerializer(serializers.HyperlinkedModelSerializer):
    team = serializers.SerializerMethodField()
    players = PlayerSerializer(read_only=True, many=True)

    class Meta:
        model = Team40ManRoster
        fields = ('team', 'players')

    def get_team(self, obj):
        return obj.team.team_id

class PlayerStatsSerializer(serializers.HyperlinkedModelSerializer):
    player = serializers.SerializerMethodField()
    pitching_stats = serializers.JSONField()
    hitting_stats = serializers.JSONField()
    fielding_stats = serializers.JSONField()

    class Meta:
        model = PlayerStats
        fields = ('year', 'player', 'pitching_stats', 
            'hitting_stats', 'fielding_stats')

    def get_player(self, obj):
        return obj.player.player_id
