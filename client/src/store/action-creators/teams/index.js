import Actions from 'store/action-constants/teams';

import TeamApi from 'api/models-mlb/teams/teams';

import {store} from 'index';

export default {
    getAll: () => {
        let currentStore = store.getState();

        if (currentStore.teams.listHasFetched) {
            return store.dispatch({
                type: Actions.TEAMS_GET_ALL_SUCCESS,
                payload: currentStore.teams.raw
            })
        }

        return TeamApi.getAll()
            .then((response) => {
                return store.dispatch({
                    type: Actions.TEAMS_GET_ALL_SUCCESS,
                    payload: response.teams
                })
            })
            .catch(() => {
                return store.dispatch({
                    type: Actions.TEAMS_GET_ALL_FAIL
                })
            })
    },
    get: (id) => {
        let currentState = store.getState();
        if (currentState.teams.listHasFetched) {
            return new Promise(() => {
                return store.dispatch({
                    type: Actions.TEAMS_GET_SUCCESS,
                    payload: id
                })
            })
        }
        return TeamApi.get(id)
            .then((response) => {
                return store.dispatch({
                    type: Actions.TEAMS_GET_SUCCESS,
                    payload: response.teams[0]
                })
            })
            .catch(() => {
                return store.dispatch({
                    type: Actions.TEAMS_GET_FAIL
                })
            })
    },
    getRoster: (id) => {
        let currentState = store.getState();
        if (currentState.teams.rostersByTeamId[id]) {
            return new Promise(() => {
                return store.dispatch({
                    type: Actions.TEAMS_GET_ROSTER_SUCCESS,
                    payload: id
                })
            })
        }
        return TeamApi.getRoster(id)
            .then((response) => {
                return store.dispatch({
                    type: Actions.TEAMS_GET_ROSTER_SUCCESS,
                    payload: {teamId:id, list:response.roster}
                })
            })
            .catch(() => {
                return store.dispatch({
                    type: Actions.TEAMS_GET_ROSTER_FAIL
                })
            })
    },
    getCoaches: (id) => {
        let currentState = store.getState();
        if (currentState.teams.coachesByTeamId[id]) {
            return new Promise(() => {
                return store.dispatch({
                    type: Actions.TEAMS_GET_COACHES_SUCCESS,
                    payload: id
                })
            })
        }
        return TeamApi.getCoaches(id)
            .then((response) => {
                return store.dispatch({
                    type: Actions.TEAMS_GET_COACHES_SUCCESS,
                    payload: {teamId:id, list:response.roster}
                })
            })
            .catch(() => {
                return store.dispatch({
                    type: Actions.TEAMS_GET_COACHES_FAIL
                })
            })
    }
}