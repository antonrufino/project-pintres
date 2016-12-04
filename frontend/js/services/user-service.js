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

        function getSubscribedTopics(username) {
            let deferred = $q.defer();

            $http.get('/api/user/' + username + '/topics/subscribed')
            .then((res) => {
                deferred.resolve(res);
            }, (err) => {
                deferred.reject(err);
            });

            return deferred.promise;
        }

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

        return {
            getCurrentUserData: getCurrentUserData,
            login: login,
            getSubscribedTopics: getSubscribedTopics
        }
    }

})();
