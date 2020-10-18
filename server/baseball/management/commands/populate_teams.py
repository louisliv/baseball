from django.core.management.base import BaseCommand
import numpy as np
from django.conf import settings
from baseball.models import Team, League, Division
import sys

import requests

BASE_URL = 'http://lookup-service-prod.mlb.com/json/named.team_all_season.bam'

class Command(BaseCommand):
    def add_arguments(self, parser):
        parser.add_argument('year', type=int)

    def handle(self, *args, **options):
        year = options.get('year')

        payload = {'sport_code': '\'mlb\'', 'all_star_sw': '\'N\'', 'season': year}

        response = requests.get(BASE_URL, params=payload)

        data = response.json()

        teams = data.get('team_all_season').get('queryResults').get('row')

        for team in teams:
            league, league_created = League.objects.get_or_create(
                league_id=int(team.get('league_id')))

            if league_created:
                league.name = team.get('league_full')
                league.abbreviation = team.get('league_abbrev')
                league.save()

            division, division_created = Division.objects.get_or_create(
                division_id=int(team.get('division_id')), league=league)

            if division_created:
                division.name = team.get('division_full')
                division.abbreviation = team.get('division_abbrev')
                division.save()

            obj, created = Team.objects.get_or_create(
                address_city = team.get('address_city'),
                address_country = team.get('address_country', None),
                address_line1 = team.get('address_line1', None),
                address_line2 = team.get('address_line2', None),
                address_line3 = team.get('address_line3', None),
                address_province = team.get('address_province', None),
                address_state = team.get('address_state', None),
                address_zip = team.get('address_zip', None),
                base_url = team.get('base_url'),
                bis_team_code = team.get('bis_team_code'),
                city = team.get('city'),
                division = division,
                franchise_code = team.get('franchise_code'),
                mlb_org = team.get('mlb_org'),
                mlb_org_id = int(team.get('mlb_org_id')),
                team_id = int(team.get('team_id')),
                venue_name = team.get('venue_name'),
                website_url = team.get('website_url')
            )
