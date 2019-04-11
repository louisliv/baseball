import Actions from 'store/action-constants/leagues';

import LeagueApi from 'api/models-server/leagues/leagues';

import {store} from 'index';

export default {
    getAll: () => {
        let currentStore = store.getState();

        if (currentStore.leagues.listHasFetched) {
            return store.dispatch({
                type: Actions.LEAGUES_GET_ALL_SUCCESS,
                payload: currentStore.leagues.raw
            })
        }

        return LeagueApi.getAll()
            .then((response) => {
                return store.dispatch({
                    type: Actions.LEAGUES_GET_ALL_SUCCESS,
                    payload: response
                })
            })
            .catch(() => {
                return store.dispatch({
                    type: Actions.LEAGUES_GET_ALL_FAIL
                })
            })
    },
    get: (id) => {
        let currentState = store.getState();
        if (currentState.leagues.listHasFetched) {
            return new Promise(() => {
                return store.dispatch({
                    type: Actions.LEAGUES_GET_SUCCESS,
                    payload: id
                })
            })
        }
        return LeagueApi.get(id)
            .then((response) => {
                return store.dispatch({
                    type: Actions.LEAGUES_GET_SUCCESS,
                    payload: response
                })
            })
            .catch(() => {
                return store.dispatch({
                    type: Actions.LEAGUES_GET_FAIL
                })
            })
    }
}