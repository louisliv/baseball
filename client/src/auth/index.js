import React from 'react';
import { UIView } from '@uirouter/react';
// import { Profile as ProfileComponent } from './profile/profile';
import { Login } from './login/login';

var auth = {
    parent: 'app',
    name: 'auth',
    url: '/auth',
    component: () => <div><UIView/></div>
}

// var profile = {
//     name: 'auth.profile',
//     url: '/profile',
//     component: ProfileComponent
// }

var login = {
    name: 'auth.login',
    url: '/login',
    component: Login
}

export {auth};
// export {profile};
export {login};
