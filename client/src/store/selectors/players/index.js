export default {
    one: (players, id) => {
        return players.byId[id] ? players.byId[id] : {}
    },
    list: (players) => {
        return players.raw
    },
    seasonStats: (players, playerId) => {
        return players.seasonStatsById[playerId] ? players.seasonStatsById[playerId] : {};
    },
    careerStats: (players, playerId) => {
        return players.careerStatsById[playerId] ? players.careerStatsById[playerId]: {};
    },
    fieldingStats: (players, playerId) => {
        return players.fieldingStatsById[playerId] ? players.fieldingStatsById[playerId]: {};
    }
};