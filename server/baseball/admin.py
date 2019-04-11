from django.contrib import admin
from .models import (League, Division, 
    Team, Player, Team40ManRoster, PlayerStats) 

# Register your models here.
admin.site.register(League)
admin.site.register(Team)
admin.site.register(Division)
admin.site.register(Player),
admin.site.register(Team40ManRoster)
admin.site.register(PlayerStats)