(() => {
    angular
        .module('app')
        .factory('FeedService', ['$http', '$q', FeedService]);

    function FeedService($http, $q) {
        function generateFeed() {
            let deferred = $q.defer();

            $http.get('/api/feed')
            .then((res) => {
                deferred.resolve(res);
            }, (err) => {
                deferred.reject(err);
            })

            return deferred.promise;
        }

        return {
            generateFeed: generateFeed
        };
    }
})();
