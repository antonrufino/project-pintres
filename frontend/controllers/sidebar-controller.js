(() => {
    angular.module('app')
    .controller('SidebarCtrl', ['$scope', '$http', 'UserService', sidebarController]);

    function sidebarController($scope, $http, UserService) {
        $scope.loadUserData = () => {
            UserService.getCurrentUserData()
            .then((res) => {
                $scope.username = res.data.username
            }, (err) => {
                Materialize.toast('Cannot connect to server.');
            });
        };
    }
})();
