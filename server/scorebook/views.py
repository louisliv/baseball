# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from .serializers import ScorecardSerializer
from .models import Scorecard

from rest_framework.decorators import action

from rest_framework import permissions, viewsets
from rest_framework.response import Response
from rest_framework import status, views
import boto3
import json

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
        data = request.data.get('data', {})

        scorecard, created = Scorecard.objects.get_or_create(
            game_id=game_id,
            user=request.user
        )

        s3 = boto3.resource('s3')
        s3object = s3.Object("gamescore-scorecard-data", f"{scorecard.id}/data.json")

        s3object.put(
            Body=(bytes(json.dumps(data).encode('UTF-8')))
        )

        return Response(ScorecardSerializer(scorecard).data, status=status.HTTP_201_CREATED)

    def update(self, request, pk=None):
        scorecard = self.get_object()
        data = request.data.get('data', None)

        if data:
            s3 = boto3.resource('s3')
            s3object = s3.Object("gamescore-scorecard-data", f"{scorecard.id}/data.json")

            s3object.put(
                Body=(bytes(json.dumps(data).encode('UTF-8')))
            )

            return Response(ScorecardSerializer(scorecard).data, status=status.HTTP_201_CREATED)
