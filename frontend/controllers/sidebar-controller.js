(() => {
    angular.module('app')
    .controller('SidebarCtrl', ['$scope', '$http', 'UserService', sidebarController]);

    function sidebarController($scope, $http, UserService) {
        $scope.user = {
            username: '',
            display_name: ''
        };

        $scope.loadUserData = () => {
            UserService($scope.user);
            console.log(UserService);
        };
    }
})();
