from django.core.management.base import BaseCommand
from django.contrib.auth import get_user_model

from siteauth.models import Profile

class Command(BaseCommand):
    def handle(self, *args, **options):
        User = get_user_model()
        users = User.objects.filter(profile=None)

        for user in users:
            Profile.objects.get_or_create(user=user)
