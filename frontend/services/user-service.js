(() => {
    angular.module('app')
    .factory('UserService', ['$http', '$q', UserService])

    function UserService($http, $q) {
        function getCurrentUserData() {
            let deferred = $q.defer();

            $http.get('/api/user')
            .then((res) => {
                deferred.resolve(res);
            }, (err) => {
                deffered.reject(err);
            });

            return deferred.promise;
        }

        return {
            getCurrentUserData: getCurrentUserData
        }
    }
})();
