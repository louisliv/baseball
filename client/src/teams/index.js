import React from 'react';
import Teams from './teams';
import TeamDetail from './detail';
import { UIView } from '@uirouter/react';

const teams = {
    parent: 'app',
    name: 'teams',
    url: '/teams',
    component: () => <div><UIView/></div>
}

const teamsState = {
    name: 'teams.list',
    url: '/',
    component: Teams
}

const teamDetail = {
    name: 'teams.details',
    url: '/:teamId',
    component: TeamDetail
}

export {teams};
export {teamsState}; 
export {teamDetail};