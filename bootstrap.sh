#!/usr/bin/env bash
# wget https://dev.mysql.com/get/mysql57-community-release-el7-9.noarch.rpm
# rpm -ivh mysql57-community-release-el7-9.noarch.rpm
# yum -y install mysql-server
yum -y install epel-release
yum -y install nodejs
yum -y install python-pip
yum -y install git
yum -y install ansible
yum -y install mod_wsgi
yum -y install alias_module
pip install pytz
pip install django==1.11.6
pip install djangorestframework
pip install django-filter==1.1
pip install django-watson
pip install pillow