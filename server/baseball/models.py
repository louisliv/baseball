# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import models
from django.core.validators import MinValueValidator

from jsonfield import JSONField

# Create your models here.

class League(models.Model):
    league_id = models.IntegerField(primary_key=True, editable=False)
    name = models.CharField(max_length=15, blank=True, null=True)
    abbreviation = models.CharField(max_length=2, blank=True, null=True)
    logo = models.ImageField(upload_to='league_logos', blank=True, null=True)

    def __str__(self):
        return self.name

class Division(models.Model):
    division_id = models.IntegerField(primary_key=True, editable=False)
    name = models.CharField(max_length=45, blank=True, null=True)
    abbreviation = models.CharField(max_length=3, blank=True, null=True)
    league = models.ForeignKey(League, related_name='divisions', on_delete=models.CASCADE)

    def __str__(self):
        return self.name

class Team(models.Model):
    address_city = models.CharField(max_length=100)
    address_country = models.CharField(max_length=30, blank=True, null=True)
    address_line1 = models.CharField(max_length=100, blank=True, null=True)
    address_line2 = models.CharField(max_length=100, blank=True, null=True)
    address_line3 = models.CharField(max_length=100, blank=True, null=True)
    address_province = models.CharField(max_length=100, blank=True, null=True)
    address_state = models.CharField(max_length=30, blank=True, null=True)
    address_zip = models.CharField(max_length=15, blank=True, null=True)
    base_url = models.CharField(max_length=100)
    bis_team_code = models.CharField(max_length=100)
    city = models.CharField(max_length=100)
    division = models.ForeignKey(Division, related_name='teams', on_delete=models.CASCADE)
    franchise_code = models.CharField(max_length=10)
    mlb_org = models.CharField(max_length=100)
    mlb_org_id = models.IntegerField(editable=False)
    team_id = models.IntegerField(primary_key=True, editable=False)
    venue_name = models.CharField(max_length=100)
    website_url = models.CharField(max_length=100, blank=True, null=True)

    def __str__(self):
        return self.mlb_org

class Player(models.Model):
    birth_country = models.CharField(max_length=100, blank=True, null=True)
    weight = models.IntegerField()
    birth_state = models.CharField(max_length=100, blank=True, null=True)
    height_inches = models.IntegerField()
    bats = models.CharField(max_length=1)
    name_first = models.CharField(max_length=100)
    birth_city = models.CharField(max_length=100, blank=True, null=True)
    height_feet = models.IntegerField()
    pro_debut_date = models.DateField(blank=True, null=True)
    birth_date = models.DateField(blank=True, null=True)
    throws = models.CharField(max_length=1)
    position = models.CharField(max_length=1)
    name_use = models.CharField(max_length=100)
    player_id = models.IntegerField(primary_key=True, editable=False)
    name_last = models.CharField(max_length=100)
    service_years = models.IntegerField(blank=True, null=True)

    def __str__(self):
        return '%s %s' % (self.name_use, self.name_last)

class Team40ManRoster(models.Model):
    team = models.ForeignKey(Team, related_name='rosters', on_delete=models.CASCADE)
    players = models.ManyToManyField(Player)

    def __str__(self):
        return self.team.mlb_org

class PlayerStats(models.Model):
    year = models.IntegerField()
    player = models.ForeignKey(Player, related_name='stats', on_delete=models.CASCADE)
    pitching_stats = JSONField()
    hitting_stats = JSONField()
    fielding_stats = JSONField()

    def __str__(self):
        return '%s - %s' % (self.player, self.year)