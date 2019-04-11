import {api} from 'api/api-mlb.js';

var Players = api.createModel('people');

Players.getSeasonStats = (playerId) => {
    let params = {
        stats: 'yearByYear',
    }

    return Players.one(playerId).getAll(params, 'stats');
}

Players.getCareerStats = (playerId) => {
    let params = {
        stats: 'career'
    }

    return Players.one(playerId).getAll(params, 'stats');
}

Players.getFieldingStats = (playerId) => {
    let params = {
        stats: 'yearByYear',
        group: 'fielding'
    }

    return Players.one(playerId).getAll(params, 'stats');
}

export default Players;