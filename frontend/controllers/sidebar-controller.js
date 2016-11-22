(() => {
    angular.module('app')
    .controller('SidebarCtrl', ['$scope', '$http', 'UserService', sidebarController]);

    function sidebarController($scope, $http, UserService) {
        $scope.user = {
            username: ''
        };

        $scope.loadUserData = () => {
            UserService($scope.user);
            console.log(UserService);
        };
    }
})();
