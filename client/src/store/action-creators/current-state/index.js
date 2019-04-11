import Actions from 'store/action-constants/current-state';
import {store} from 'index';

export default {
    set: (currentState) => {
        return store.dispatch({
            type: Actions.SET_CURRENT_STATE,
            payload: currentState
        });
    }
}