import _ from 'lodash';
import Actions from 'store/action-constants/teams';

import { transformToObject } from "store/utils";

var initialState = {
    raw: [],
    byId: {},
    listHasFetched: false,
    rostersByTeamId: {},
    coachesByTeamId: {}
};

function teams(state = initialState, action) {
    let newById;

    switch (action.type) {
        case Actions.TEAMS_GET_ALL_SUCCESS:
            return Object.assign({}, state, {
                raw: _.clone(action.payload),
                byId: transformToObject(action.payload),
                listHasFetched: true,
                rostersByTeamId: state.rostersByTeamId,
                coachesByTeamId: state.coachesByTeamId,
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
            })
        
        default:
            return state
    }
}

export default teams;