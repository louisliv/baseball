import React from 'react';
import { UIView } from '@uirouter/react';
import TeamList from './teamList';
import TeamSchedule from './teamSchedule';
import Game from './game';

const scorebook = {
    parent: 'app',
    name: 'scorebook',
    url: '/scorebook',
    component: () => <div><UIView/></div>,
}

const teamList = {
    name: 'scorebook.teamList',
    url: '/my-teams',
    component: TeamList,
    requireAuth: true
}

const teamSchedule = {
    name: 'scorebook.teamSchedule',
    url: '/my-teams/:teamId',
    component: TeamSchedule,
    requireAuth: true
}

const game = {
    name: 'scorebook.game',
    url: '/game/:gameId',
    component: Game,
    requireAuth: true
}

export { scorebook };
export { teamList };
export { teamSchedule };
export { game };