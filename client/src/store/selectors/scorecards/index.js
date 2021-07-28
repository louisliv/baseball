import { createSelector } from "reselect";

const one = createSelector(
    (state) => state.scorecards,
    (_, id) => id,
    (scorecards, id) => {
        return scorecards.byId[id] ? scorecards.byId[id] : {}
    }
)

const byGame = createSelector(
    (state) => [state.scorecards, state.currentUser.id],
    (_, gameId) => gameId,
    ([scorecards, userId], gameId) => {
        return scorecards.byGame[gameId] && scorecards.byGame[gameId][userId] ? 
            scorecards.byGame[gameId][userId] : {};
    }
)

export default {
    one: one,
    byGame: byGame
};