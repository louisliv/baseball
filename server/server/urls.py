"""server URL Configuration

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/1.11/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  url(r'^$', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  url(r'^$', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.conf.urls import url, include
    2. Add a URL to urlpatterns:  url(r'^blog/', include('blog.urls'))
"""
from django.conf import settings
from django.conf.urls import url, include
from django.conf.urls.static import static
from django.urls import path
from django.contrib import admin
from rest_framework import routers
from siteauth.views import (AuthViewSet, ProfileViewSet, 
    TodoViewSet)
from baseball.views import (TeamViewSet, DivisionViewSet, 
    LeagueViewSet, PlayerViewSet, Team40ManRosterViewSet,
    PlayerStatsViewSet)

from scorebook.views import ScorecardViewSet

router = routers.DefaultRouter()
router.register(r'auth', AuthViewSet, 'auth')
router.register(r'profiles', ProfileViewSet, 'profiles')
router.register(r'teams', TeamViewSet, 'teams')
router.register(r'divisions', DivisionViewSet, 'divisions')
router.register(r'leagues', LeagueViewSet, 'leagues')
router.register(r'team_40_man', Team40ManRosterViewSet, 'team_40_man')
router.register(r'players', PlayerViewSet, 'players')
router.register(r'player_stats', PlayerStatsViewSet, 'player_stats')
router.register(r'scorecards', ScorecardViewSet, 'scorecards')

urlpatterns = [
    url(r'^admin/', admin.site.urls),
    url(r'^api/', include(router.urls)),
    path('sitemonitor', include('sitemonitor.urls')),
]
