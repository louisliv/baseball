'use strict';

function MediaItemStates ($stateProvider) {
    var self = this;
  
    var mediaItems = {
        name: 'mediaitems',
        abstract: true,
        url: '/mediaitems',
        templateUrl: '/app/mediaitems/mediaitems.html',
        controller: angular.noop,
        controllerAs: 'mediaitems'
    };

    var mediaSearch = {
        name: 'mediaitems.search',
        url: '?searchTerm',
        templateUrl: '/app/mediaitems/search/search.html',
        controller: 'MediaSearchController',
        controllerAs: 'ctrl',
        resolve: {
            searchResults: function($stateParams, MediaItems) {
                return MediaItems.search($stateParams.searchTerm)
                    .then(function (response) {
                        return response.data;
                    });
            }
        }
    };

    var mediaDetails = {
        name: 'mediaitems.details',
        url: '/:id',
        templateUrl: '/app/mediaitems/details/details.html',
        controller: 'MediaDetailsController',
        controllerAs: 'ctrl',
        resolve: {
            mediaItem: function($stateParams, MediaItems) {
                return MediaItems.get($stateParams.id)
                    .then(function (response) {
                        return response.data
                    });
            }
        }
    };

    $stateProvider.state(mediaItems);
    $stateProvider.state(mediaDetails);
    $stateProvider.state(mediaSearch);
};

angular.module('project.mediaitems', [
  'project.api.mediaitems',
  'project.mediaitems.search',
  'project.mediaitems.details',
])
  .config(MediaItemStates);