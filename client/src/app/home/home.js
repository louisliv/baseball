'use strict';

function HomeController (MediaItems, $state) {
	var self = this;

	MediaItems.getTopLoved()
		.then(function (response) {
			self.mediaItems = response.data;
		});

	self.submitSearch = function () {
		MediaItems.search(self.searchTerm)
			.then(function (response) {
				$state.go('mediaitems.search', {searchTerm: self.searchTerm});
			});
	}
};

angular.module('project.home', [
	'project.api.mediaitems',
	'project.utils.avatar',
	'project.utils.filters'
])
	.controller('HomeController', HomeController);