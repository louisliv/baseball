import {api} from 'api/api-mlb.js';

var Players = api.createModel('named.sport_career_hitting.bam');

Players.byPlayerId = (playerId) => {
    let params = {
        league_list_id: '\'mlb\'',
        game_type: '\'R\'',
        player_id: `'${playerId}'`
    }

    return Players.getAll(params)
}

export default Players;