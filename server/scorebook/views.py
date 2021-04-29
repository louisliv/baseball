# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from .serializers import ScorecardSerializer
from .models import Scorecard

from rest_framework.decorators import action

from rest_framework import permissions, viewsets
from rest_framework.response import Response
from rest_framework import status, views


# Create your views here.
class ScorecardViewSet(viewsets.ModelViewSet):
    serializer_class = ScorecardSerializer
    pagination_class = None
    permission_classes = [permissions.IsAuthenticated]

    def get_queryset(self):
        queryset = Scorecard.objects.filter(user=self.request.user)
        game = self.request.query_params.get('game', None)
        if game is not None:
            queryset = queryset.filter(game_id=game)
        return queryset

    def create(self, request):
        game_id = request.data.get('game', None)
        scorecard, created = Scorecard.objects.get_or_create(
            game_id=game_id,
            user=request.user,
            data=request.data.get('data', {})
        )
        return Response(ScorecardSerializer(scorecard).data, status=status.HTTP_201_CREATED)