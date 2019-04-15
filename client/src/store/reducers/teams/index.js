import _ from 'lodash';
import Actions from 'store/action-constants/teams';

import { transformToObject } from "store/utils";

var initialState = {
    raw: [],
    byId: {},
    listHasFetched: false,
    rostersByTeamId: {},
    coachesByTeamId: {},
    byDate: {},
};

function teams(state = initialState, action) {
    let newById;
    let newByDate;
    let teamId;
    let date;

    switch (action.type) {
        case Actions.TEAMS_GET_ALL_SUCCESS:
            return Object.assign({}, state, {
                raw: _.clone(action.payload),
                byId: transformToObject(action.payload),
                listHasFetched: true,
                rostersByTeamId: state.rostersByTeamId,
                coachesByTeamId: state.coachesByTeamId,
                byDate: state.byDate
            })
        case Actions.TEAMS_GET_SUCCESS:
            if (state.listHasFetched && state.byId[action.payload]) {
                return state
            }

            newById = _.clone(state.byId);
            newById[action.payload.id] = action.payload;

            return Object.assign({}, state, {
                raw: [...state.raw, action.payload],
                byId: newById,
                listHasFetched: state.listHasFetched,
                rostersByTeamId: state.rostersByTeamId,
                coachesByTeamId: state.coachesByTeamId,
                byDate: state.byDate
            })
        case Actions.TEAMS_GET_ROSTER_SUCCESS:
            if (state.rostersByTeamId[action.payload]) {
                return state
            }

            newById = _.clone(state.rostersByTeamId);
            newById[action.payload.teamId] = action.payload.list;

            return Object.assign({}, state, {
                raw: state.raw,
                byId: state.byId,
                listHasFetched: state.listHasFetched,
                rostersByTeamId: newById,
                coachesByTeamId: state.coachesByTeamId,
                byDate: state.byDate
            })
        case Actions.TEAMS_GET_BY_DATE_SUCCESS:
            if (action.payload.returnCurrent) {
                return state
            }

            newByDate = _.clone(state.byDate);
            teamId = action.payload.teamId;
            date = action.payload.date

            if (!newByDate[teamId]) {
                newByDate[teamId] = {}
            }

            newByDate[teamId][date] = action.payload.list

            return Object.assign({}, state, {
                raw: state.raw,
                byId: state.byId,
                listHasFetched: state.listHasFetched,
                rostersByTeamId: state.rostersByTeamId,
                coachesByTeamId: state.coachesByTeamId,
                byDate: newByDate
            })
        case Actions.TEAMS_GET_COACHES_SUCCESS:
            if (state.coachesByTeamId[action.payload]) {
                return state
            }

            newById = _.clone(state.coachesByTeamId);
            newById[action.payload.teamId] = action.payload.list;

            return Object.assign({}, state, {
                raw: state.raw,
                byId: state.byId,
                listHasFetched: state.listHasFetched,
                rostersByTeamId: state.rostersByTeamId,
                coachesByTeamId: newById,
                byDate: state.byDate
            })
        
        default:
            return state
    }
}

export default teams;