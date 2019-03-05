'use strict';

function ProfileController (profile, toastr, ChangeAvatarModal) {
	var self = this;

    self.profile = profile;

    self.openModal = function (){
        ChangeAvatarModal.show()
            .result.then(function (avatarData) {
                self.profile.updateAvatar(avatarData);
            })
    }
    
    self.submit = function () {
        self.profile.update()
            .then(function (response) {
                toastr.success('Profile saved successfully.')
            })
            .catch(function () {
                toastr.error('There was an issue with your request.')
            });
    }
};

angular.module('project.auth.profile', [
    'project.api.profiles',
    'project.auth.profile.changeavatar',
    'project.utils.avatar'
])
	.controller('ProfileController', ProfileController);