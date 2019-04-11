import {api} from 'api/api-server.js';

var Auth = api.createModel('auth');

Auth.current = () => {
    return Auth.getAll({}, 'current')
}

Auth.isAuthenticated = () => {
    return Auth.getAll({}, 'is_authenticated')
}

Auth.login = (credentials) => {
    return Auth.post(credentials, 'login')
}

Auth.logout = () => {
    return Auth.post({}, 'logout')
}

Auth.addTeam = (data) => {
    return Auth.put(data, 'add_team')
}

export default Auth;