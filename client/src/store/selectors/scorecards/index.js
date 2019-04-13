export default {
    one: (scorecards, id) => {
        return scorecards.byId[id] ? scorecards.byId[id] : {}
    },
    byGame: (scorecards, gameId, userId) => {
        return scorecards.byGame[gameId] && scorecards.byGame[gameId][userId] ? 
            scorecards.byGame[gameId][userId] : {};
    }
};