from rest_framework import viewsets
from .models import (Team, Division, League,
    Player, Team40ManRoster, PlayerStats)
from .serializers import (TeamSerializer, 
    DivisionSerializer, LeagueSerializer,
    PlayerSerializer, Team40ManRosterSerializer,
    PlayerStatsSerializer)

# Create your views here.
class TeamViewSet(viewsets.ModelViewSet):
    queryset = Team.objects.all()
    serializer_class = TeamSerializer
    pagination_class = None

class DivisionViewSet(viewsets.ModelViewSet):
    queryset = Division.objects.all()
    serializer_class = DivisionSerializer
    pagination_class = None

class LeagueViewSet(viewsets.ModelViewSet):
    queryset = League.objects.all()
    serializer_class = LeagueSerializer
    pagination_class = None

class PlayerViewSet(viewsets.ModelViewSet):
    queryset = Player.objects.all()
    serializer_class = PlayerSerializer

class Team40ManRosterViewSet(viewsets.ModelViewSet):
    serializer_class = Team40ManRosterSerializer
    pagination_class = None

    def get_queryset(self):
        queryset = Team40ManRoster.objects.all()
        team = self.request.query_params.get('team', None)
        if team is not None:
            queryset = queryset.filter(team__team_id=team)
        return queryset

class PlayerStatsViewSet(viewsets.ModelViewSet):
    queryset = PlayerStats.objects.all()
    serializer_class = PlayerStatsSerializer

    def get_queryset(self):
        queryset = PlayerStats.objects.all()
        player = self.request.query_params.get('player', None)
        if player is not None:
            queryset = queryset.filter(player__player_id=player)
        return queryset
