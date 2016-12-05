(() => {
    angular.module('app')
    .factory('SearchService', ['$http', '$q', SearchService]);

    function SearchService($http, $q) {
        function searchUser(keyword) {
            let deferred = $q.defer();

            $http.get('/api/search/user', {
                params: {keyword: keyword}
            }).then((res) => {
                deferred.resolve(res);
            }, (err) => {
                deferred.reject(err);
            })

            return deferred.promise;
        }

        function searchBoard(keyword) {
            let deferred = $q.defer();

            $http.get('/api/search/board', {
                params: {keyword: keyword}
            }).then((res) => {
                deferred.resolve(res);
            }, (err) => {
                deferred.reject(err);
            })

            return deferred.promise;
        }

        function searchTopic(keyword) {
            let deferred = $q.defer();

            $http.get('/api/search/topic', {
                params: {keyword: keyword}
            }).then((res) => {
                deferred.resolve(res);
            }, (err) => {
                deferred.reject(err);
            })

            return deferred.promise;
        }

        return {
            searchUser: searchUser,
            searchBoard: searchBoard,
            searchTopic: searchTopic
        };
    }
})();
