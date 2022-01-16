#!/bin/bash

python manage.py createcachetable
python manage.py migrate
python manage.py loaddata test_users.json
python manage.py loaddata test_profiles.json
