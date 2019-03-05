import AUTH_CONSTANTS from 'store/action-constants/auth/auth';

const AuthActions = {
    setCurrent(user) {
        return {
            type: AUTH_CONSTANTS.SET_CURRENT,
            user
        }
    },

    clearCurrent() {
        return {
            type: AUTH_CONSTANTS.CLEAR_CURRENT
        }
    }
}

export default AuthActions;