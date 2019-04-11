import Actions from 'store/action-constants/loading';
import {store} from 'index';

export default {
    start: () => {
        return store.dispatch({
            type: Actions.START_LOADING
        });
    },
    stop: () => {
        return store.dispatch({
            type: Actions.STOP_LOADING
        });
    }
}