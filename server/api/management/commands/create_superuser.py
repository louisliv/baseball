from django.core.management.base import BaseCommand
from django.contrib.auth.models import User
from optparse import make_option

class Command(BaseCommand):

    def add_arguments(self, parser):
        parser.add_argument('user', type=str)
        parser.add_argument('password', type=str)
        parser.add_argument('email', type=str)

    def handle(self, *args, **options):
        user = User.objects.create_superuser(
            username = options.get('user'),
            password = options.get('password'),
            email = options.get('email')
            )
        user.save( ) 