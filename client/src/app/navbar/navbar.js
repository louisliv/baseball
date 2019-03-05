'use strict';

function NavbarController ($rootScope, Auth, $state, $scope) {
    var self = this;

    $rootScope.$on('currentUserSet', function () {
        self.user = Auth._current;
    });

    Auth.getCurrent();
    
    self.submitSearch = function () {
        $state.go('mediaitems.search', {searchTerm: self.searchTerm})
    }

    self.logout = function () {
        Auth.logout()
    }

    $scope.popoverUrl = 'navbarMenuPopover.html';
};

function Navbar () {
    return {
		restrict: 'E',
        templateUrl : "/app/navbar/navbar.html",
        controller: NavbarController,
        controllerAs: 'navbar'
    };
};

angular.module('project.navbar', [
    'project.api.auth',
    'project.utils.avatar',
    'project.utils.filters'
])
    .directive('navbar', Navbar);