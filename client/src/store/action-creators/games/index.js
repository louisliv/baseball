import Actions from 'store/action-constants/games';

import GameApi from 'api/models-mlb/games/games';

import {store} from 'index';

export default {
    get: (id) => {
        let currentState = store.getState();
        if (currentState.games.listHasFetched) {
            return new Promise(() => {
                return store.dispatch({
                    type: Actions.GAMES_GET_SUCCESS,
                    payload: id
                })
            })
        }
        return GameApi.context(id)
            .then((response) => {
                return store.dispatch({
                    type: Actions.GAMES_GET_SUCCESS,
                    payload: response.game
                })
            })
            .catch(() => {
                return store.dispatch({
                    type: Actions.GAMES_GET_FAIL
                })
            })
    }
}