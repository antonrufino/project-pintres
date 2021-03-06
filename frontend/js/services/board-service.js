(() => {
    angular.module('app')
    .factory('BoardService', ['$http', '$q', BoardService]);

    function BoardService($http, $q) {
        function subscribe(id) {
            let deferred = $q.defer();

            $http.post('/api/board/' + id +'/subscribe', {})
            .then((res) => {
                deferred.resolve(res);
            }, (err) => {
                deferred.reject(err);
            })

            return deferred.promise;
        }

        function unsubscribe(id) {
            let deferred = $q.defer();

            $http.post('/api/board/' + id +'/unsubscribe', {})
            .then((res) => {
                deferred.resolve(res);
            }, (err) => {
                deferred.reject(err);
            });

            return deferred.promise;
        }

        function isSubscribed(id) {
            let deferred = $q.defer();

            $http.post('/api/board/' + id +'/subscribed', {})
            .then((res) => {
                deferred.resolve(res);
            }, (err) => {
                deferred.reject(err);
            });

            return deferred.promise;
        }

        function getBoardData(id) {
            let deferred = $q.defer();

            $http.get('/api/board/' + id)
            .then((res) => {
                deferred.resolve(res);
            }, (err) => {
                deferred.reject(err);
            });

            return deferred.promise;
        }

        function getBoardPosts(id) {
            let deferred = $q.defer();

            $http.get('/api/board/' + id + '/posts')
            .then((res) => {
                deferred.resolve(res);
            }, (err) => {
                deferred.reject(err);
            });

            return deferred.promise;
        }

        function createBoard(name) {
            let deferred = $q.defer();

            $http.post('/api/board', {
                name: name
            }).then((res) => {
                deferred.resolve(res);
            }, (err) => {
                deferred.reject(err);
            });

            return deferred.promise;
        }

        function editBoard(id, name) {
            let deferred = $q.defer();

            $http.post('/api/board/edit', {
                id: id,
                name: name
            }).then((res) => {
                deferred.resolve(res);
            }, (err) => {
                deferred.reject(err);
            });

            return deferred.promise;
        }

        function deleteBoard(id) {
            let deferred = $q.defer();

            $http.post('/api/board/remove', {
                id: id
            }).then((res) => {
                deferred.resolve(res);
            }, (err) => {
                deferred.reject(err);
            });

            return deferred.promise;
        }

        return {
            subscribe: subscribe,
            unsubscribe: unsubscribe,
            isSubscribed: isSubscribed,
            getBoardData: getBoardData,
            getBoardPosts: getBoardPosts,
            createBoard: createBoard,
            editBoard: editBoard,
            deleteBoard: deleteBoard
        };
    }
})();
