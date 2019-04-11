import {api} from 'api/api-server.js';

var PlayerStats = api.createModel('player_stats');

PlayerStats.getByPlayerId = (playerId) => {
    let params = {
        player: playerId
    }

    return PlayerStats.getAll(params);
}

export default PlayerStats;