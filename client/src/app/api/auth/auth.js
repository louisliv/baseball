function Auth (api, $q, $rootScope) {
    var model, modelExtensions = {};

    model = api.createModel('auth', modelExtensions);

    model.getCurrent = function (forceGET) {
		if (model._current && !forceGET) {
			return $q.resolve(model._current);
		}

		return model.customGET('current')
			.then(function (response) {
				model.setCurrent(response.data);
				return model._current;
			});
	};

    model.isAuthenticated = function () {
        var self = this;
        
        return self.customGET('is_authenticated');
    }

    model.setCurrent = function (user) {
        model._current = user;
        $rootScope.$broadcast('currentUserSet');
    }
    
    model.login = function (credentials) {
        var self = this;

        return self.customPOST({
            username: credentials.username,
            password: credentials.password
        }, 'login')
        .then(function (response) {
            model.setCurrent(response.data);
            return response;
        });
    }

    model.logout = function () {
        var self = this;

        return self.customPOST({}, 'logout')
            .then(function () {
                self.setCurrent(null);
            });
    }

    model.register = function (newUserData) {
        var self = this;

        return self.customPOST(newUserData, 'register')
            .then(function (response) {
                self.setCurrent(response.data);
            });
    }

    return model;
};

angular.module('project.api.auth', ['project.api'])
    .factory('Auth', Auth);