from django.core.management.base import BaseCommand
import numpy as np
import pandas as pd
from django.conf import settings
from baseball.models import Team, Team40ManRoster, Player
import sys

import requests

BASE_URL = 'http://lookup-service-prod.mlb.com/json/named.roster_40.bam'

class Command(BaseCommand):
    def handle(self, *args, **options):
        teams = Team.objects.all()

        for team in teams:
            payload = {'team_id': '\'%s\'' % team.team_id}

            response = requests.get(BASE_URL, params=payload)

            data = response.json()

            roster_40 = data.get('roster_40').get('queryResults').get('row')

            team_40, created = Team40ManRoster.objects.get_or_create(team=team)

            team_40.players.clear()

            for player in roster_40:
                team_40.players.add(create_player(player))

            team_40.save()


def create_player(player_data):
    service_years = int(player_data.get('service_years')) if player_data.get('service_years') else 0
    pro_debut_date = format_date(player_data.get('pro_debut_date'))
    birth_date = format_date(player_data.get('birth_date'))
    
    player, created = Player.objects.get_or_create(
        birth_country = player_data.get('birth_country'),
        weight = int(player_data.get('weight')),
        birth_state = player_data.get('birth_state'),
        height_inches = int(player_data.get('height_inches')),
        bats = player_data.get('bats'),
        name_first = player_data.get('name_first'),
        birth_city = player_data.get('birth_city'),
        height_feet = int(player_data.get('height_feet')),
        pro_debut_date = pro_debut_date,
        birth_date = birth_date,
        throws = player_data.get('throws'),
        position = player_data.get('primary_position'),
        name_use = player_data.get('name_use'),
        player_id = int(player_data.get('player_id')),
        name_last = player_data.get('name_last'),
        service_years = service_years
    )

    return player

def format_date(date_string):
    if date_string:
        return date_string.split('T')[0]
    return None