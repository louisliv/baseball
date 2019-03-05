function AvatarController () {
    var self = this;

    self.size = self.size || 'small';
}

var Avatar = {
    templateUrl: '/app/utils/avatar/avatar.html',
    controller: AvatarController,
    bindings: {
        user: '=',
        size: '=?'
    }
}

angular.module('project.utils.avatar', [
    'project.utils.filters'
])
    .component('avatar', Avatar)