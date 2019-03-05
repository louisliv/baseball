function Comments (api) {
	var model, modelExtensions = {};

	model = api.createModel('comments', modelExtensions);
    
    model.toggleUserLove = function (commentId) {
        var self = this;

        return self.customPOST({}, commentId + '/toggle_user_love');
    }

	return model;
};

angular.module('project.api.comments', ['project.api'])
	.factory('Comments', ['api', Comments]);