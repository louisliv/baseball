#!/usr/bin/env bash
# wget https://dev.mysql.com/get/mysql57-community-release-el7-9.noarch.rpm
# wget https://download.postgresql.org/pub/repos/yum/9.6/redhat/rhel-7-x86_64/pgdg-centos96-9.6-3.noarch.rpm
# rpm -ivh mysql57-community-release-el7-9.noarch.rpm
# yum -y install pgdg-centos96-9.6-3.noarch.rpm epel-release
# yum -y install mysql-server
yum -y install https://download.postgresql.org/pub/repos/yum/9.6/redhat/rhel-7-ppc64le/pgdg-centos96-9.6-3.noarch.rpm
yum -y update
yum -y check-update
yum -y install epel-release
yum -y install nodejs
yum -y install python-pip
yum -y install git
yum -y install gcc
yum -y install python-devel
yum -y install python34-devel
yum -y install postgresql96-devel
yum -y install postgresql-devel
yum -y install ansible
yum -y install mod_wsgi
yum -y install alias_module
yum -y install postgresql96 postgresql96-server postgresql96-libs postgresql96-contrib postgresql96-devel
pip install --upgrade pip
pip install pytz
pip install django==1.11.6
pip install psycopg2
pip install djangorestframework
pip install django-filter==1.1
pip install django-watson
pip install pillow
pip install numpy
pip install pandas
pip install requests
pip install jsonfield
pip install django-cors-headers