import _ from 'lodash';
import Actions from 'store/action-constants/auth';

import AuthApi from 'api/models-server/auth/auth';

import {store} from 'index';

export default {
    setCurrent() {
        let currentState = store.getState();

        if (!_.isEmpty(currentState.currentUser)) {
            return new Promise(() => {
                return store.dispatch({
                    type: Actions.SET_CURRENT,
                    payload: currentState.currentUser
                })
            })
        }

        return AuthApi.current()
            .then((response) => {
                return store.dispatch({
                    type: Actions.SET_CURRENT,
                    payload: response
                })
            })
            .catch(() => {
                return store.dispatch({
                    type: Actions.SET_CURRENT_FAIL
                })
            })
    },

    addTeam(data) {
        return AuthApi.addTeam(data)
            .then((response) => {
                return store.dispatch({
                    type: Actions.SET_CURRENT,
                    payload: response
                })
            })
            .catch(() => {
                return store.dispatch({
                    type: Actions.SET_CURRENT_FAIL
                })
            })
    },

    clearCurrent(){
        let currentState = store.getState();

        if (_.isEmpty(currentState.currentUser)) {
            return new Promise(() => {
                return store.dispatch({
                    type: Actions.CLEAR_CURRENT,
                })
            })
        }

        return AuthApi.current()
            .then(() => {
                return store.dispatch({
                    type: Actions.CLEAR_CURRENT
                })
            })
            .catch(() => {
                return store.dispatch({
                    type: Actions.CLEAR_CURRENT_FAIL
                })
            })
    },

    login(creds) {
        console.log('in action');
        let currentState = store.getState();

        if (!_.isEmpty(currentState.currentUser)) {
            return new Promise(() => {
                return store.dispatch({
                    type: Actions.LOGIN_SUCCESS,
                    payload: currentState.currentUser
                })
            })
        }

        return AuthApi.login(creds)
            .then((response) => {
                return store.dispatch({
                    type: Actions.LOGIN_SUCCESS,
                    payload: response
                })
            })
            .catch(() => {
                return store.dispatch({
                    type: Actions.LOGIN_FAIL
                })
            })
    },

    logout(){
        let currentState = store.getState();

        if (_.isEmpty(currentState.currentUser)) {
            return new Promise(() => {
                return store.dispatch({
                    type: Actions.LOGOUT_SUCCESS,
                })
            })
        }

        return AuthApi.logout()
            .then(() => {
                return store.dispatch({
                    type: Actions.LOGOUT_SUCCESS
                })
            })
            .catch(() => {
                return store.dispatch({
                    type: Actions.LOGOUT_FAIL
                })
            })
    },
}