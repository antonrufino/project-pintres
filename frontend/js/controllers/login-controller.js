(() => {
    angular.module('app-login')
    .controller('LoginCtrl', ['$scope', '$window', 'AuthService', loginController]);

    function loginController($scope, $window, AuthService) {
        $scope.login = () => {
            AuthService.login($scope.username, $scope.password)
            .then((res) => {
                if (res.data.length !== 1) {
                    Materialize.toast('Wrong credentials', 3000);
                } else {
                    $window.location.href = '/main';
                }
            }, (err) => {
                console.log(err);
                Materialize.toast('Something went wrong.');
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
