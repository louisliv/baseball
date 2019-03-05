'use strict';

function AuthStates ($stateProvider) {
    var self = this;
  
    var auth = {
        name: 'auth',
        abstract: true,
        url: '/auth',
        templateUrl: '/app/auth/auth.html',
        controller: angular.noop,
        controllerAs: 'auth'
    };

    var profile = {
        name: 'auth.profile',
        url: '/:id',
        templateUrl: '/app/auth/profile/profile.html',
        controller: 'ProfileController',
        controllerAs: 'ctrl',
        resolve: {
            profile: function($stateParams, Profiles) {
                return Profiles.get($stateParams.id)
                    .then(function (response) {
                        return response.data;
                    });
            }
        }
    };

    var login = {
        name: 'auth.login',
        url: '/login',
        templateUrl: '/app/auth/login/login.html',
        controller: 'LoginController',
        controllerAs: 'login',
    };

    var register = {
        name: 'auth.register',
        url: '/register',
        templateUrl: '/app/auth/register/register.html',
        controller: 'RegisterController',
        controllerAs: 'register',
    }

    $stateProvider.state(auth);
    $stateProvider.state(login);
    $stateProvider.state(profile);
    $stateProvider.state(register);
};

angular.module('project.auth', [
  'project.api.auth',
  'project.api.profiles',
  'project.auth.profile',
  'project.auth.login',
  'project.auth.register'
])
  .config(AuthStates);