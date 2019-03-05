var intialState = {};

function currentUser(state = intialState, action) {
    switch (action.type) {
        case 'SET_CURRENT':
            return Object.assign({}, state, action.user)
        case 'CLEAR_CURRENT':
            return intialState
        default:
            return state
    }
}

export default currentUser;