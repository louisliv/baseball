import Actions from 'store/action-constants/scorecards';

import ScorecardApi from 'api/models-server/scorecards/scorecards';

import {store} from 'index';

export default {
    get: (id) => {
        let currentState = store.getState();
        if (currentState.scorecards.byId[id]) {
            return new Promise(() => {
                return store.dispatch({
                    type: Actions.SCORECARDS_GET_SUCCESS,
                    payload: {returnCurrent: true}
                })
            })
        }
        return ScorecardApi.get(id)
            .then((response) => {
                return store.dispatch({
                    type: Actions.SCORECARDS_GET_SUCCESS,
                    payload: {scorecard: response}
                })
            })
            .catch(() => {
                return store.dispatch({
                    type: Actions.SCORECARDS_GET_FAIL
                })
            })
    },
    getByGame: (gameId, userId) => {
        let currentState = store.getState();
        if (currentState.scorecards.byGame[gameId] && 
            currentState.scorecards.byGame[gameId][userId]) {
            return new Promise(() => {
                return store.dispatch({
                    type: Actions.SCORECARDS_GET_BY_GAME_SUCCESS,
                    payload: {returnCurrent: true}
                })
            })
        }
        return ScorecardApi.getByGame(gameId)
            .then((response) => {
                return store.dispatch({
                    type: Actions.SCORECARDS_GET_BY_GAME_SUCCESS,
                    payload: {scorecard:response[0]}
                })
            })
            .catch(() => {
                return store.dispatch({
                    type: Actions.SCORECARDS_GET_BY_GAME_FAIL
                })
            })
    },
    create: (data) => {
        return ScorecardApi.post(data)
            .then((response) => {
                return store.dispatch({
                    type: Actions.SCORECARDS_ADD_SUCCESS,
                    payload: {scorecard:response}
                })
            })
            .catch(() => {
                return store.dispatch({
                    type: Actions.SCORECARDS_ADD_FAIL
                })
            })
    }
}