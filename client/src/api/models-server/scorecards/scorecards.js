import {api} from 'api/api-server.js';

var Scorecards = api.createModel('scorecards');

Scorecards.getByGame = (gameId) => {
    return Scorecards.getAll({game: gameId})
}

export default Scorecards;