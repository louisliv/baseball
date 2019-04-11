import _ from 'lodash';
import Actions from 'store/action-constants/games';

var initialState = {
    raw: [],
    byId: {},
    listHasFetched: false,
};

function games(state = initialState, action) {
    let newById;

    switch (action.type) {
        case Actions.GAMES_GET_SUCCESS:
            if (state.listHasFetched && state.byId[action.payload]) {
                return state
            }

            newById = _.clone(state.byId);
            newById[action.payload.gamePk] = action.payload;

            return Object.assign({}, state, {
                raw: [...state.raw, action.payload],
                byId: newById,
                listHasFetched: state.listHasFetched
            })
        
        default:
            return state
    }
}

export default games;