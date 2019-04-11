import React from 'react';
import PlayerDetail from './detail';
import { UIView } from '@uirouter/react';

const players = {
    parent: 'app',
    name: 'players',
    url: '/players',
    component: () => <div><UIView/></div>
}

const playerDetails = {
    name: 'players.details',
    url: '/:id',
    component: PlayerDetail
}

export {players};
export {playerDetails};