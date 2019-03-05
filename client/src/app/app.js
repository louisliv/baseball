'use strict';

// Declare app level module which depends on views, and components
angular.module('project', [
  'toastr',
  'ngImgCrop',
  'ngAnimate',
  'ui.bootstrap',
  'ui.router',
  'restangular',
  'project.api',
  'project.navbar',
  'project.home',
  'project.mediaitems',
  'project.auth',
  'project.utils'
]).
config(['$locationProvider', 
  '$stateProvider', 
  '$urlRouterProvider', 
  'RestangularProvider',
  function($locationProvider, $stateProvider, $urlRouterProvider, RestangularProvider) {
    $locationProvider.hashPrefix('!');

    RestangularProvider.setRequestSuffix('/');

    RestangularProvider.setFullResponse(true)

    RestangularProvider.addResponseInterceptor(function(data, operation, what, url, response) {
      if (operation === "getList") {
          data.results._resultmeta = {
              "count": response.count,
              "next": response.next,
              "previous": response.previous
          };
          return data.results;
      }
    
      return data;
    });

    var home = {
    	name: 'home',
    	url: '/',
    	templateUrl: '/app/home/home.html',
    	controller: 'HomeController',
      controllerAs: 'home'
    };

    $urlRouterProvider.when('', '/');

    $stateProvider.state(home);
}]).
config(['$httpProvider', function ($httpProvider) {
  $httpProvider.defaults.xsrfHeaderName = 'X-CSRFToken';
  $httpProvider.defaults.xsrfCookieName = 'csrftoken';
}]).
config(['toastrConfig', function (toastrConfig) {
  angular.extend(toastrConfig, {
    autoDismiss: false,
    containerId: 'toast-container',
    maxOpened: 0,    
    newestOnTop: true,
    positionClass: 'toast-bottom-right',
    preventDuplicates: false,
    preventOpenDuplicates: false,
    target: 'body'
  });
}])
.run(['$rootScope', '$state', function ($rootScope, $state) {
  $rootScope.$on('$stateChangeSuccess', function (ev, to, toParams, from, fromParams) {
    $rootScope.previousState = from;
    $rootScope.fromParams = fromParams;
    // document.body.scrollTop = document.documentElement.scrollTop = 0;
  });
}]);