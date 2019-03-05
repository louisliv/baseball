'use strict';

function MediaSearchController (searchResults) {
	var self = this;

	self.searchResults = searchResults;
};

angular.module('project.mediaitems.search', [])
	.controller('MediaSearchController', MediaSearchController);