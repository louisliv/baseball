'use strict';

function LoginController (Auth, toastr, $state) {
	var self = this;
    
    self.submit = function () {
        Auth.login(self.loginData)
            .then(function (response) {
                toastr.success('Login successful.');
                $state.go('home');
            })
            .catch(function () {
                toastr.error('There was an issue with your request.')
            });
    }
};

angular.module('project.auth.login', [
    'project.api.auth'
])
	.controller('LoginController', LoginController);