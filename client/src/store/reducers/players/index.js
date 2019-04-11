import _ from 'lodash';
import Actions from 'store/action-constants/players';

import { transformToObject } from "store/utils";

var initialState = {
    raw: [],
    byId: {},
    listHasFetched: false,
    seasonStatsById: {},
    careerStatsById: {},
    fieldingStatsById: {}
};

function players(state = initialState, action) {
    let newById;

    switch (action.type) {
        case Actions.PLAYERS_GET_ALL_SUCCESS:
            return Object.assign({}, state, {
                raw: _.clone(action.payload),
                byId: transformToObject(action.payload),
                listHasFetched: true,
                seasonStatsById: state.seasonStatsById,
                careerStatsById: state.careerStatsById,
                fieldingStatsById: state.fieldingStatsById
            })
        case Actions.PLAYERS_GET_SUCCESS:
            if (state.listHasFetched && state.byId[action.payload]) {
                return state
            }

            newById = _.clone(state.byId);
            newById[action.payload.id] = action.payload;

            return Object.assign({}, state, {
                raw: [...state.raw, action.payload],
                byId: newById,
                listHasFetched: state.listHasFetched,
                seasonStatsById: state.seasonStatsById,
                careerStatsById: state.careerStatsById,
                fieldingStatsById: state.fieldingStatsById
            })
        case Actions.PLAYERS_GET_SEASON_STATS_SUCCESS:
            if (state.seasonStatsById[action.payload]) {
                return state
            }

            newById = _.clone(state.seasonStatsById);
            newById[action.payload.playerId] = action.payload.list;

            return Object.assign({}, state, {
                raw: state.raw,
                byId: state.byId,
                listHasFetched: state.listHasFetched,
                seasonStatsById: newById,
                careerStatsById: state.careerStatsById,
                fieldingStatsById: state.fieldingStatsById
            })
        case Actions.PLAYERS_GET_CAREER_STATS_SUCCESS:
            if (state.careerStatsById[action.payload]) {
                return state
            }

            newById = _.clone(state.careerStatsById);
            newById[action.payload.playerId] = action.payload.list;

            return Object.assign({}, state, {
                raw: state.raw,
                byId: state.byId,
                listHasFetched: state.listHasFetched,
                seasonStatsById: state.seasonStatsById,
                careerStatsById: newById,
                fieldingStatsById: state.fieldingStatsById
            })

        case Actions.PLAYERS_GET_FIELDING_STATS_SUCCESS:
            if (state.fieldingStatsById[action.payload]) {
                return state
            }

            newById = _.clone(state.fieldingStatsById);
            newById[action.payload.playerId] = action.payload.list;

            return Object.assign({}, state, {
                raw: state.raw,
                byId: state.byId,
                listHasFetched: state.listHasFetched,
                seasonStatsById: state.seasonStatsById,
                careerStatsById: state.careerStatsById,
                fieldingStatsById: newById
            })
        
        default:
            return state
    }
}

export default players;