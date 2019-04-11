import {api} from 'api/api-mlb.js';

let baseParams = {
    sportId: 1
};

var Schedules = api.createModel('schedule', baseParams);

Schedules.getByTeam = (teamId, year) => {
    return Schedules.getAll({
        teamId: teamId,
        gameType: "R",
        startDate:"3/15/" + year,
        endDate:"10/15/" + year
    });
}

export default Schedules;