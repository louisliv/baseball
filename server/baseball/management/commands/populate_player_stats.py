from django.core.management.base import BaseCommand
import numpy as np
import pandas as pd
from django.conf import settings
from baseball.models import Player, PlayerStats
import sys

import requests

import datetime

HITTING_BASE_URL = 'http://lookup-service-prod.mlb.com/json/named.sport_hitting_tm.bam'
PITCHING_BASE_URL = 'http://lookup-service-prod.mlb.com/json/named.sport_pitching_tm.bam'

class Command(BaseCommand):
    def handle(self, *args, **options):
        year = datetime.datetime.now().year

        players = Player.objects.all()

        for player in players:
            if player.pro_debut_date:
                start_year = player.pro_debut_date.year

                for search_year in range(start_year, year):

                    try:
                        year_stats = PlayerStats.objects.get(player=player, year=search_year)
                    except PlayerStats.DoesNotExist:
                        payload = {
                            'league_list_id': '\'mlb\'',
                            'player_id': '\'%s\'' % player.player_id,
                            'season': '\'%s\'' % search_year,
                            'game_type': '\'R\''
                        }
                        hitting_response = requests.get(HITTING_BASE_URL, 
                            params=payload)
                        pitching_response = requests.get(PITCHING_BASE_URL, 
                            params=payload)

                        hitting_data = hitting_response.json().get('sport_hitting_tm').get('queryResults').get('row')
                        pitching_data = pitching_response.json().get('sport_pitching_tm').get('queryResults').get('row')
                        
                        if hitting_data or pitching_data:
                            year_stats = PlayerStats.objects.create(player=player, 
                                year=search_year)
                            year_stats.hitting_stats = hitting_data
                            year_stats.pitching_stats = pitching_data
                            year_stats.save()

                            print(year_stats)