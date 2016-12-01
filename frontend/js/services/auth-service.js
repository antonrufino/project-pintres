(() => {
    angular.module('app-login')
    .factory('AuthService', ['$http', '$q', AuthService])

    function AuthService($http, $q) {
        function login(username, password) {
            let deferred = $q.defer();

            $http.post('/api/login', {
                username: username,
                password: password
            }).then((res) => {
                deferred.resolve(res);
            }, (err) => {
                deferred.resolve(err);
            });

            return deferred.promise;
        }

        function createAccount(username, password, email) {
            let deferred = $q.defer();

            $http.post('/api/user', {
                username: username,
                password: password,
                email: email
            }).then((res) => {
                deferred.resolve(res);
            }, (err) => {
                deferred.reject(err);
            });

            return deferred.promise;
        }

        return {
            login: login,
            createAccount: createAccount
        }
    }

})();
