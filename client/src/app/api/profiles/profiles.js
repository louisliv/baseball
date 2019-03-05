function Profiles (api, Auth) {
	var model, modelExtensions = {};

	modelExtensions.update = function () {
		return this.save()
			.then(function (response) {
				Auth.setCurrent(response.data);
				return response;
			});
	};

	modelExtensions.updateAvatar = function (avatarData) {
		var self = this;
		return self.post('update_avatar', {avatar: avatarData})
			.then(function (response) {
				self.avatar = response.data.avatar;
				Auth._current.avatar = response.data.avatar;
				return response;
			});
	};

	model = api.createModel('profiles', modelExtensions);

	return model;
};

angular.module('project.api.profiles', [
	'project.api',
	'project.api.auth'
])
	.factory('Profiles', ['api', 'Auth', Profiles]);