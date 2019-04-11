import Actions from 'store/action-constants/auth';

var initialState = {};

function auth(state = initialState, action) {
    switch (action.type) {
        case Actions.SET_CURRENT:
        case Actions.LOGIN_SUCCESS:
            return Object.assign({}, state, action.payload);
        case Actions.CLEAR_CURRENT:
        case Actions.LOGOUT_SUCCESS:
            return initialState;
        default:
            return state;
    }
}

export default auth;