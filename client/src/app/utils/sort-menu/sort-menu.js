function SortMenuController ($scope) {
    var self = this;

    self.ngModel = self.sortObjects[0];
    $scope.popoverUrl = 'sortMenuPopover.html';

    self.setSortObject = function (sortObject) {
        self.ngModel = sortObject;
    }
}

var sortMenu = {
    templateUrl: '/app/utils/sort-menu/sort-menu.html',
    controller: SortMenuController,
    controllerAs: 'sortMenu',
    bindings: {
        sortObjects: '=',
        title: '=',
        ngModel: '='
    }
}

angular.module('project.utils.sort-menu', [
    'project.utils.filters'
])
    .component('sortMenu', sortMenu)