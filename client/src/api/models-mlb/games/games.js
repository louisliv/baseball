import {api} from 'api/api-mlb.js';

var Games = api.createModel('game');

Games.context = (gameId) => {
    return Games.one(gameId).getAll({}, 'contextMetrics');
}

export default Games;