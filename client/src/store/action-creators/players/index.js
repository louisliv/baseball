import Actions from 'store/action-constants/players';

import PlayerApi from 'api/models-mlb/players/players';

import {store} from 'index';

export default {
    getAll: () => {
        let currentStore = store.getState();

        if (currentStore.players.listHasFetched) {
            return store.dispatch({
                type: Actions.PLAYERS_GET_ALL_SUCCESS,
                payload: currentStore.players.raw
            })
        }

        return PlayerApi.getAll()
            .then((response) => {
                return store.dispatch({
                    type: Actions.PLAYERS_GET_ALL_SUCCESS,
                    payload: response.people
                })
            })
            .catch(() => {
                return store.dispatch({
                    type: Actions.PLAYERS_GET_ALL_FAIL
                })
            })
    },
    get: (id) => {
        let currentState = store.getState();
        if (currentState.players.listHasFetched) {
            return new Promise(() => {
                return store.dispatch({
                    type: Actions.PLAYERS_GET_SUCCESS,
                    payload: id
                })
            })
        }
        return PlayerApi.get(id)
            .then((response) => {
                return store.dispatch({
                    type: Actions.PLAYERS_GET_SUCCESS,
                    payload: response.people[0]
                })
            })
            .catch(() => {
                return store.dispatch({
                    type: Actions.PLAYERS_GET_FAIL
                })
            })
    },
    getSeasonStats: (id) => {
        let currentState = store.getState();
        if (currentState.players.seasonStatsById[id]) {
            return new Promise(() => {
                return store.dispatch({
                    type: Actions.PLAYERS_GET_SEASON_STATS_SUCCESS,
                    payload: id
                })
            })
        }
        return PlayerApi.getSeasonStats(id)
            .then((response) => {
                return store.dispatch({
                    type: Actions.PLAYERS_GET_SEASON_STATS_SUCCESS,
                    payload: {playerId:id, list:response.stats[0]}
                })
            })
            .catch(() => {
                return store.dispatch({
                    type: Actions.PLAYERS_GET_SEASON_STATS_FAIL
                })
            })
    },
    getCareerStats: (id) => {
        let currentState = store.getState();
        if (currentState.players.careerStatsById[id]) {
            return new Promise(() => {
                return store.dispatch({
                    type: Actions.PLAYERS_GET_CAREER_STATS_SUCCESS,
                    payload: id
                })
            })
        }
        return PlayerApi.getCareerStats(id)
            .then((response) => {
                return store.dispatch({
                    type: Actions.PLAYERS_GET_CAREER_STATS_SUCCESS,
                    payload: {playerId:id, list:response.stats[0]}
                })
            })
            .catch(() => {
                return store.dispatch({
                    type: Actions.PLAYERS_GET_CAREER_STATS_FAIL
                })
            })
    },
    getFieldingStats: (id) => {
        let currentState = store.getState();
        if (currentState.players.fieldingStatsById[id]) {
            return new Promise(() => {
                return store.dispatch({
                    type: Actions.PLAYERS_GET_FIELDING_STATS_SUCCESS,
                    payload: id
                })
            })
        }
        return PlayerApi.getFieldingStats(id)
            .then((response) => {
                return store.dispatch({
                    type: Actions.PLAYERS_GET_FIELDING_STATS_SUCCESS,
                    payload: {playerId:id, list:response.stats[0]}
                })
            })
            .catch(() => {
                return store.dispatch({
                    type: Actions.PLAYERS_GET_FIELDING_STATS_FAIL
                })
            })
    }
}