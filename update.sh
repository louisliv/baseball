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
echo -e " ${LRED}#${NC}  ${GREEN}Installing Scorekeeping App${NC} ${LRED}#${NC}"
echo -e " ${LRED}########################################${NC}"
echo -e "Progress:1"

###################################
##  Install Python Dependencies  ##
###################################
echo -e " ${LRED}-${NC}${WHITE} Updating Python Dependencies...${NC}"

cd $BASEBALL

sudo python3 -m pip install -r requirements.txt

echo -e "Progress:25"
sleep 1

##########################
## Update Database      ##
##########################
echo -e "\n ${LRED}-${NC}${WHITE} Update the database..${NC}\n"

cd $BASEBALL/server
sudo python3 -m manage migrate
sudo python3 -m manage fix_missing_profiles

echo -e "Progress:50"
sleep 1

##########################
## Install UI           ##
##########################
echo -e "\n ${LRED}-${NC}${WHITE} Updating UI Modules..${NC}\n"
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

##########################
## Restart Services     ##
##########################
echo -e "\n ${LRED}-${NC}${WHITE} Restarting Services..${NC}\n"
sudo systemctl daemon-reload

sudo systemctl start runserver.service
sudo systemctl enable runserver.service
sudo systemctl restart nginx.service
sudo systemctl reload nginx.service

echo -e "Progress:100"