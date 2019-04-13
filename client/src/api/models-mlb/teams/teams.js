import {api} from 'api/api-mlb.js';

let baseParams = {
    leagueListId: 'mlb'
};

var Teams = api.createModel('teams', baseParams);

Teams.getRoster = (teamId) => {
    return Teams.one(teamId).getAll({}, 'roster/active');
}

Teams.getCoaches = (teamId) => {
    return Teams.one(teamId).getAll({}, 'coaches')
}

Teams.gamedayRoster = (teamId, date) => {
    return Teams.one(teamId).getAll({
        date: date
    }, 'roster/active');
}

export default Teams;