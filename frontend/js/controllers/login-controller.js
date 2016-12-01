(() => {
    angular.module('app-login')
    .controller('LoginCtrl', ['$scope', '$window', 'AuthService', loginController]);

    function loginController($scope, $window, AuthService) {
        $scope.login = () => {
            AuthService.login($scope.username, $scope.password)
            .then((res) => {
                console.log("surprise");
                console.log(res.data);
                if (!res.data.success) {
                    Materialize.toast('Wrong credentials', 3000);
                } else {
                    $window.location.href = '/main';
                }
            }, (err) => {
                console.log(err);
            })
        }

        $scope.createAccount = () => {
            AuthService.createAccount($scope.username, $scope.password,
                $scope.email)
            .then((res) => {
                $window.location.href = '/main';
            }, (err) => {
                if (err.data.code === 'ER_DUP_ENTRY') {
                    Materialize.toast('Username is taken', 3000);
                } else {
                    Materialize.toast('An unknown error occured.', 3000);
                }
            });
        }
    }
})();
