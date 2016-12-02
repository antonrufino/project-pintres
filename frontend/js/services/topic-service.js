(() => {
    angular.module('app')
    .factory('TopicService', ['$http', '$q', TopicService]);

    function TopicService($http, $q) {
        function subscribe(username, topic) {
            let deferred = $q.defer();

            $http.post('/api/topic/subscribe', {
                username: username,
                topic: topic
            }).then((res) => {
                deferred.resolve(res);
            }, (err) => {
                deferred.reject(err);
            })

            return deferred.promise;
        }

        return {
            subscribe: subscribe
        };
    }
})();
