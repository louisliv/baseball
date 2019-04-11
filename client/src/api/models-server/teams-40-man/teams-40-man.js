import {api} from 'api/api-server.js';

var Teams40Man = api.createModel('team_40_man');

Teams40Man.getByTeamId = (teamId) => {
    let params = {
        team: teamId
    }

    return Teams40Man.getAll(params);
}

export default Teams40Man;