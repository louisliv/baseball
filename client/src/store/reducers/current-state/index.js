import Actions from 'store/action-constants/current-state';
var initialState = {};

function currentState(state = initialState, action) {
    switch (action.type) {
        case Actions.SET_CURRENT_STATE:
            return Object.assign({}, state, action.payload)
        default:
            return state;
    }
}

export default currentState;