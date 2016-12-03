(() => {
    angular.module('app')
    .factory('TopicService', ['$http', '$q', TopicService]);

    function TopicService($http, $q) {
        function subscribe(username, topic) {
            let deferred = $q.defer();

            $http.post('/api/topic/' + topic +'/subscribe', {
                username: username
            }).then((res) => {
                deferred.resolve(res);
            }, (err) => {
                deferred.reject(err);
            })

            return deferred.promise;
        }

        function unsubscribe(username, topic) {
            let deferred = $q.defer();

            $http.post('/api/topic/' + topic +'/unsubscribe', {
                username: username
            }).then((res) => {
                deferred.resolve(res);
            }, (err) => {
                deferred.reject(err);
            });

            return deferred.promise;
        }

        function getTopicPosts(topic) {
            let deferred = $q.defer();

            $http.get('/api/topic/' + topic)
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
            getTopicPosts: getTopicPosts
        };
    }
})();
