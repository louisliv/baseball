'use strict';

function MediaDetailsController (mediaItem) {
	var self = this;
	self.mediaItem = mediaItem;
};

angular.module('project.mediaitems.details', [
	'project.mediaitems.details.mediaitemcard',
	'project.mediaitems.details.comments',
	'project.mediaitems.details.related-media'
])
	.controller('MediaDetailsController', MediaDetailsController);