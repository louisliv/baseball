import Actions from 'store/action-constants/schedules';

import ScheduleApi from 'api/models-mlb/schedules/schedules';

import {store} from 'index';

export default {
    getByTeam: (teamId, year) => {
        let currentState = store.getState();
        if (currentState.schedules.byTeam[teamId]) {
            return new Promise(() => {
                return store.dispatch({
                    type: Actions.SCHEDULES_GET_BY_TEAM_SUCCESS,
                    payload: teamId
                })
            })
        }
        return ScheduleApi.getByTeam(teamId, year)
            .then((response) => {
                return store.dispatch({
                    type: Actions.SCHEDULES_GET_BY_TEAM_SUCCESS,
                    payload: {teamId:teamId, list:response.dates}
                })
            })
            .catch(() => {
                return store.dispatch({
                    type: Actions.SCHEDULES_GET_BY_TEAM_FAIL
                })
            })
    }
}