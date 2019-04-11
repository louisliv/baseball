import Actions from 'store/action-constants/divisions';

import DivisionApi from 'api/models-mlb/divisions/divisions';

import {store} from 'index';

export default {
    getAll: () => {
        let currentStore = store.getState();

        if (currentStore.divisions.listHasFetched) {
            return store.dispatch({
                type: Actions.DIVISIONS_GET_ALL_SUCCESS,
                payload: currentStore.divisions.raw
            })
        }

        return DivisionApi.getAll()
            .then((response) => {
                return store.dispatch({
                    type: Actions.DIVISIONS_GET_ALL_SUCCESS,
                    payload: response.divisions
                })
            })
            .catch(() => {
                return store.dispatch({
                    type: Actions.DIVISIONS_GET_ALL_FAIL
                })
            })
    },
    get: (id) => {
        let currentState = store.getState();
        if (currentState.divisions.listHasFetched) {
            return new Promise(() => {
                return store.dispatch({
                    type: Actions.DIVISIONS_GET_SUCCESS,
                    payload: id
                })
            })
        }
        return DivisionApi.get(id)
            .then((response) => {
                return store.dispatch({
                    type: Actions.DIVISIONS_GET_SUCCESS,
                    payload: response.divisions
                })
            })
            .catch(() => {
                return store.dispatch({
                    type: Actions.DIVISIONS_GET_FAIL
                })
            })
    }
}