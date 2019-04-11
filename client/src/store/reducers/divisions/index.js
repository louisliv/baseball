import _ from 'lodash';
import Actions from 'store/action-constants/divisions';

import { transformToObject } from "store/utils";

var initialState = {
    raw: [],
    byId: {},
    listHasFetched: false,
};

function divisions(state = initialState, action) {
    let newById;

    switch (action.type) {
        case Actions.DIVISIONS_GET_ALL_SUCCESS:
            return Object.assign({}, state, {
                raw: _.clone(action.payload),
                byId: transformToObject(action.payload),
                listHasFetched: true
            })
        case Actions.DIVISIONS_GET_SUCCESS:
            if (state.listHasFetched && state.byId[action.payload]) {
                return state
            }

            newById = _.clone(state.byId);
            newById[action.payload.id] = action.payload;

            return Object.assign({}, state, {
                raw: [...state.raw, action.payload],
                byId: newById,
                listHasFetched: state.listHasFetched
            })
        
        default:
            return state
    }
}

export default divisions;