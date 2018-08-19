#!/usr/bin/env bash

yum -y install epel-release
yum -y install nodejs
yum -y install python-pip
yum -y install git
yum -y install ansible
yum -y install mod_wsgi
yum -y install alias_module
pip install --upgrade pip
pip install django==1.10
pip install djangorestframework
pip install django-taggit
pip install pillow