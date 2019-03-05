function ChangeAvatarController ($scope, $uibModalInstance, toastr) {
    $scope.myImage='';
    $scope.myCroppedImage='';

    $scope.handleFileSelect = function (evt) {
        var file = evt.currentTarget.files[0];
        $scope.$apply(function ($scope) {
            $scope.myImage = URL.createObjectURL(file);
        });
    };

    this.cancel = function () {
        $uibModalInstance.dismiss()
    }
    
    this.ok = function () {
        if ($scope.myImage.length) {
            $uibModalInstance.close($scope.myCroppedImage);
        } else {
            toastr.error('An image must be chosen');
        }

    }
};

function ChangeAvatarModal ($uibModal) {
    var self = this;
    self.modalInstance = null;

    self.show = function () {

        self.modalInstance = $uibModal.open({
            animation: true,
            templateUrl: '/app/auth/profile/_components/changeavatarmodal/changeavatarmodal.html',
            controller: ChangeAvatarController,
            controllerAs: 'modal',
            backdrop: 'static',
            size: 'lg',
        });

        return self.modalInstance;
    }

    return self;
}

function avatarFileOnChange () {
    return {
        restrict: 'A',
        link: function (scope, element, attrs) {
            var onChangeHandler = scope.$eval(attrs.avatarFileOnChange);
            element.bind('change', onChangeHandler);
        }
    };
}

angular.module('project.auth.profile.changeavatar', ['ngImgCrop'])
    .service('ChangeAvatarModal', ChangeAvatarModal)
    .directive('avatarFileOnChange', avatarFileOnChange);