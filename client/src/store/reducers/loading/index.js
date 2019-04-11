import Actions from 'store/action-constants/loading';
var initialState = {
    state: false
};

function loading(state = initialState, action) {
    switch (action.type) {
        case Actions.START_LOADING:
            return Object.assign({}, state, { state: true })
        case Actions.STOP_LOADING:
            return Object.assign({}, state, { state: false })
        default:
            return state;
    }
}

export default loading;