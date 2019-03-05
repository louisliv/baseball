import currentUser from './reducers/auth/auth';
import {reducer as toastrReducer} from 'react-redux-toastr'

function appStore(state = {}, action) {
    return {
        currentUser: currentUser(state.currentUser, action),
        toastr: toastrReducer(state.toastr, action)
    }
}

export default appStore;