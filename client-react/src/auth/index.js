import { Auth as AuthComponent } from './auth';
import { Profile as ProfileComponent } from './profile/profile';
import { Login } from './login/login';

var auth = {
    name: 'auth',
    url: '/auth',
    component: AuthComponent,
    abstract: true
}

var profile = {
    name: 'auth.profile',
    url: '/profile',
    component: ProfileComponent
}

var login = {
    name: 'auth.login',
    url: '/login',
    component: Login
}

export {auth};
export {profile};
export {login};
