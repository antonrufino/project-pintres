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
                deferred.reject(err);
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

        function getSubscribedBoards(username) {
            let deferred = $q.defer();

            $http.get('/api/user/' + username + '/boards/subscribed')
            .then((res) => {
                deferred.resolve(res);
            }, (err) => {
                deferred.reject(err);
            });

            return deferred.promise;
        }

        function getBoardsByUser(username) {
            let deferred = $q.defer();

            $http.get('/api/user/' + username + '/boards')
            .then((res) => {
                deferred.resolve(res);
            }, (err) => {
                deferred.reject(err);
            });

            return deferred.promise;
        }

        function getPostsByUser(username) {
            let deferred = $q.defer();

            $http.get('/api/user/' + username + '/posts')
            .then((res) => {
                deferred.resolve(res);
            }, (err) => {
                deferred.reject(err);
            });

            return deferred.promise;
        }

        function editUser(old_username, new_username, password, description) {
            let deferred = $q.defer();

            $http.post('/api/user/' + old_username + '/edit', {
                username: new_username,
                password: password,
                description: description
            }).then((res) => {
                deferred.resolve(res);
            }, (err) => {
                deferred.reject(err);
            });

            return deferred.promise;
        }

        function getUserDescription(username) {
            let deferred = $q.defer();

            $http.get('/api/user/' + username + '/description')
            .then((res) => {
                console.log(res.data);
                deferred.resolve(res);
            }, (err) => {
                deferred.reject(err);
            });

            return deferred.promise;
        }

        return {
            getCurrentUserData: getCurrentUserData,
            login: login,
            getSubscribedTopics: getSubscribedTopics,
            getSubscribedBoards: getSubscribedBoards,
            getBoardsByUser: getBoardsByUser,
            getPostsByUser: getPostsByUser,
            editUser: editUser,
            getUserDescription, getUserDescription
        };
    }

})();
