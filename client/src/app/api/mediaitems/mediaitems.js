function MediaItems (api) {
	var model, modelExtensions = {};

	modelExtensions.related = function () {
		var self = this;

		return self.customGET('related');
	}

	modelExtensions.comments = function () {
		var self = this;

		return self.customGET('comments')
	}

	modelExtensions.addComment = function (text) {
		var self = this;
		
		return self.customPOST({'text': text}, 'comments')
	}

	modelExtensions.toggleUserLove = function () {
		var self = this;

		return self.customPOST({}, 'toggle_user_love');
	}

	model = api.createModel('mediaitems', modelExtensions);

	model.search = function (search_term) {
		var self = this;
		
		return self.customGET('search', {search_term: search_term});
	}

	model.getTopLoved = function () {
		var self = this;

		return self.getList({ordering: '-love_count'})
	}

	return model;
};

angular.module('project.api.mediaitems', ['project.api'])
	.factory('MediaItems', ['api', MediaItems]);