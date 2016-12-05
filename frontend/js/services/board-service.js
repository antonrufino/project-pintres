(() => {
    angular.module('app')
    .factory('BoardService', ['$http', '$q', BoardService]);

    function BoardService($http, $q) {
        function subscribe(username, Board) {
            let deferred = $q.defer();

            $http.post('/api/Board/' + Board +'/subscribe', {
                username: username
            }).then((res) => {
                deferred.resolve(res);
            }, (err) => {
                deferred.reject(err);
            })

            return deferred.promise;
        }

        function unsubscribe(username, Board) {
            let deferred = $q.defer();

            $http.post('/api/Board/' + Board +'/unsubscribe', {
                username: username
            }).then((res) => {
                deferred.resolve(res);
            }, (err) => {
                deferred.reject(err);
            });

            return deferred.promise;
        }

        function getBoardPosts(id) {
            let deferred = $q.defer();

            $http.get('/api/board/' + id)
            .then((res) => {
                deferred.resolve(res);
            }, (err) => {
                deferred.reject(err);
            });

            return deferred.promise;
        }

        return {
            subscribe: subscribe,
            unsubscribe: unsubscribe,
            getBoardPosts: getBoardPosts
        };
    }
})();
