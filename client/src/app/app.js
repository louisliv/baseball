'use strict';

// Declare app level module which depends on views, and components
angular.module('project', [
  'toastr',
  'ui.router',
  'restangular',
  'project.api',
  'project.home',
  'project.utils',
  'project.utils.filters'
]).
config(['$locationProvider', 
  '$stateProvider', 
  '$urlRouterProvider', 
  'RestangularProvider',
  function($locationProvider, $stateProvider, $urlRouterProvider, RestangularProvider) {
    $locationProvider.hashPrefix('!');

    RestangularProvider.setRequestSuffix('/');

    RestangularProvider.setFullResponse(true)

    var home = {
    	name: 'home',
    	url: '/',
    	templateUrl: '/app/home/home.html',
    	controller: HomeController,
      controllerAs: 'home'
    };

    $urlRouterProvider.when('', '/');

    $stateProvider.state(home);
}]).
config(['$httpProvider', function ($httpProvider) {
  $httpProvider.defaults.xsrfHeaderName = 'X-CSRFToken';
  $httpProvider.defaults.xsrfCookieName = 'csrftoken';
}])
.run(['$rootScope', '$state', function ($rootScope, $state) {
  $rootScope.$on('$stateChangeSuccess', function (ev, to, toParams, from, fromParams) {
    $rootScope.previousState = from;
    $rootScope.fromParams = fromParams;
    // document.body.scrollTop = document.documentElement.scrollTop = 0;
  });
}]);