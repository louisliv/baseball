import React from 'react';
import { UIView } from '@uirouter/react';
import TeamList from './teamList';
import TeamSchedule from './teamSchedule';
import SetLineups from './game/set-lineups';
import Game from './game';
import Scorecard from './scorecard';

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

const setLineups = {
    name: 'scorebook.set-lineups',
    url: '/game/:gameId/scorecard/:scorecardId/away/:awayTeamId/home/:homeTeamId/date/:date/set-lineups',
    component: SetLineups,
    requireAuth: true
}

const scorecard = {
    name: 'scorebook.scorecard',
    url: '/scorecard/:scorecardId',
    data: {
        excludeSidebar: true
    },
    requireAuth: true,
    component: Scorecard,
}

export { scorebook };
export { teamList };
export { teamSchedule };
export { game };
export { setLineups };
export { scorecard };