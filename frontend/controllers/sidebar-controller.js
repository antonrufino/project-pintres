(() => {
    angular.module('app')
    .controller('SidebarCtrl', ['$scope', '$http', ($scope, $http) => {
        $scope.user = {
            username: '',
            display_name: ''
        };

        $scope.loadUserData = () => {
            $http.get('/api/user')
            .then((response) => {
                console.log(response.data);
                $scope.user.username = response.data.username;
                $scope.user.display_name = response.data.display_name;
            }, (response) => {
                Materialize.toast('Oops! Something went wrong.', 3000);
            });
        };
    }]);
})();
