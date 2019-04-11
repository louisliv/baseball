import _ from 'lodash';
import Actions from 'store/action-constants/schedules';

var initialState = {
    raw: [],
    byId: {},
    listHasFetched: false,
    byTeam: {}
};

function schedules(state = initialState, action) {
    let newById;

    switch (action.type) {
        case Actions.SCHEDULES_GET_BY_TEAM_SUCCESS:
            if (state.byTeam[action.payload]) {
                return state
            }

            newById = _.clone(state.byTeam);
            newById[action.payload.teamId] = action.payload.list;

            return Object.assign({}, state, {
                raw: state.raw,
                byId: state.byId,
                listHasFetched: state.listHasFetched,
                byTeam: newById
            })
        
        default:
            return state
    }
}

export default schedules;