function extend (extention) {
	return extention;
};

function Api (Restangular) {
	var apiObject = {};

	Restangular.setBaseUrl(location.origin + '/api/');

	apiObject.createModel = function (modelName, modelExtensions) {
		Restangular.extendModel(modelName, function (extentions) {
			_.extend(extentions, modelExtensions);

			return extentions;
		});

		var model = Restangular.all(modelName);
		
		return model;
	};

	return apiObject;
};

angular.module('project.api', [])
	.service('api', ['Restangular', Api]);