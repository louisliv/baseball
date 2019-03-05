'use strict';

function RegisterController (Auth, toastr, $state) {
	var self = this;
    
    self.submit = function () {
        Auth.register(self.registerData)
            .then(function (response) {
                toastr.success('Registration successful.');
                $state.go('home');
            })
            .catch(function () {
                toastr.error('There was an issue with your request.')
            });
    }
};

angular.module('project.auth.register', [
    'project.api.auth'
])
	.controller('RegisterController', RegisterController);