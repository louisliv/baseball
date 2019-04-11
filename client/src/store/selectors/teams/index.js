export default {
    one: (teams, id) => {
        return teams.byId[id] ? teams.byId[id] : {}
    },
    list: (teams) => {
        return teams.raw
    },
    roster: (teams, teamId) => {
        return teams.rostersByTeamId[teamId];
    },
    coaches: (teams, teamId) => {
        return teams.coachesByTeamId[teamId];
    },
    idList: (teams) => {
        return teams.byId ? teams.byId : {}
    }
};