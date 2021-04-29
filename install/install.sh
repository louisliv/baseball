#!/bin/bash

GREEN='\033[0;32m'
LGREEN='\033[1;32m'
LRED='\033[1;31m'
WHITE='\033[1;37m'
ORANGE='\033[0;33m'
NC='\033[0m'
RUNASROOT="run-as-root"
NOROOT="no-root"

SCRIPTPATH=$(realpath $0)
BASEBALL=`pwd`

clear
echo -e " ${LRED}########################################${NC}"
echo -e " ${LRED}#${NC}  ${GREEN}Installing ScoreKeeping Application${NC} ${LRED}#${NC}"
echo -e " ${LRED}########################################${NC}"
echo -e "Progress:1"

########################
##  Remove Old Files  ##
########################
echo -e " ${LRED}-${NC}${WHITE} Removing old files...${NC}"
sudo rm /var/www/baseball
sudo rm /etc/systemd/system/runserver.service
sudo rm /etc/nginx/sites-enabled/baseball_nginx.conf
sudo rm /etc/nginx/sites-enabled/default
sudo rm -rf $BASEBALL/client/build

############################
##  Destroy Old Database  ##
############################
echo -e " ${LRED}-${NC}${WHITE} Destroying old database...${NC}"
if command -v dropdb &> /dev/null
then
    sudo -u postgres dropdb -p 5432 --if-exists baseball
fi

echo -e "Progress:10"

#########################
##  Install Miniconda  ##
#########################
echo -e " ${LRED}-${NC}${WHITE} Installing Miniconda...${NC}"

mkdir -p ~/miniconda3
wget https://repo.anaconda.com/miniconda/Miniconda3-latest-Linux-x86_64.sh -O ~/miniconda3/miniconda.sh
bash ~/miniconda3/miniconda.sh -b -u -p ~/miniconda3
rm -rf ~/miniconda3/miniconda.sh
~/miniconda3/bin/conda init bash
~/miniconda3/bin/conda init zsh
sudo apt -y install python3-pip

echo -e "Progress:20"
sleep 1

################################
##  Install Anaconda-Project  ##
################################
echo -e " ${LRED}-${NC}${WHITE} Installing Anaconda Project...${NC}"

~/miniconda3/bin/conda activate base
~/miniconda3/bin/conda install -y anaconda-project

###################################
##  Install Python Dependencies  ##
###################################
echo -e " ${LRED}-${NC}${WHITE} Python Dependencies...${NC}"

cd $BASEBALL

sudo python3 -m pip install -r install/requirements.txt

echo -e "Progress:25"
sleep 1

################################
##  Install NGINX  ##
################################
echo -e " ${LRED}-${NC}${WHITE} Installing Ubuntu Packages...${NC}"

sudo apt -y install nginx nodejs npm postgresql postgresql-contrib

echo -e "Progress:30"
sleep 1

##########################
## Setup Database       ##
##########################
echo -e "\n ${LRED}-${NC}${WHITE} Setting up the database..${NC}\n"
cd $BASEBALL
sudo -u createdb -p 5432 baseball
sudo -u postgres psql -p 5432 -d baseball -f sql/00_create_databases.sql
sudo -u postgres psql -p 5432 -d baseball -f sql/01_grant_user_perms.sql

cd $BASEBALL/server
sudo python3 -m manage migrate
sudo python3 -m manage populate_teams 2021

echo -e "Progress:50"
sleep 1

##########################
## Setup Admin User     ##
##########################
echo -e "\n ${LRED}-${NC}${WHITE} Setting up the admin user ${NC}${ORANGE}*INPUT REQUIRED*..${NC}\n"
sudo python3 -m manage createsuperuser


##########################
## Install UI             ##
##########################
echo -e "\n ${LRED}-${NC}${WHITE} Installing UI..${NC}\n"
cd $BASEBALL/client
npm install

echo -e "Progress:60"
sleep 1

##########################
## Build UI             ##
##########################
echo -e "\n ${LRED}-${NC}${WHITE} Building UI..${NC}\n"
cd $BASEBALL/client
npm run build

echo -e "Progress:80"
sleep 1

################################
##  Set Sym Links  ##
################################
echo -e " ${LRED}-${NC}${WHITE} Setting Sym Links...${NC}"

cd $BASEBALL
echo $BASEBALL
sudo ln -s $BASEBALL /var/www
sudo ln -s $BASEBALL/runserver.service /etc/systemd/system/
sudo ln -s $BASEBALL/baseball_nginx.conf /etc/nginx/sites-enabled/

sudo systemctl daemon-reload

sudo systemctl start runserver.service
sudo systemctl enable runserver.service
sudo systemctl restart nginx.service
sudo systemctl reload nginx.service

echo -e "Progress:90"
sleep 1

echo -e "Progress:100"