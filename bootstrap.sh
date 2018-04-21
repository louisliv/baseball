#!/usr/bin/env bash

apt-get update
apt-get install -y npm
apt-get install -y nodejs-legacy
apt-get install -y git
apt-get install -y python-pip
apt-get install -y libxml2-dev
apt-get install -y libxslt-dev
apt-get install -y python-dev
apt-get install -y python-lxml
apt-get install -y software-properties-common
apt-get install -y libtiff5-dev libjpeg8-dev zlib1g-dev libfreetype6-dev liblcms2-dev libwebp-dev tcl8.6-dev tk8.6-dev python-tk
apt-add-repository ppa:ansible/ansible
apt-get update
apt-get install -y ansible
pip install django==1.10
apt-get install -y libapache2-mod-wsgi
pip install djangorestframework
pip install django-taggit
pip install pillow