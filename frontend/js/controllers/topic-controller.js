(() => {
    angular.module('app')
    .controller('TopicCtrl', ['$scope', '$routeParams', 'UserService',
        'PostService', 'TopicService', topicController]);

    function topicController($scope, $routeParams, UserService, PostService,
        TopicService) {
        $scope.user = {};
        $scope.posts = [];
        $scope.topic_name = $routeParams.topic;
        $scope.boardsByUser = [];

        UserService.getCurrentUserData()
        .then((res) => {
            $scope.user.username = res.data.username;

            UserService.getSubscribedTopics(res.data.username)
            .then((res) => {
                $scope.user.topics = res.data;
            }, (err) => {
                Materialize.toast('Cannot connect to server.', 3000);
                console.log(err);
            });

            UserService.getBoardsByUser(res.data.username)
            .then((res) => {
                $scope.boardsByUser = res.data;
            }, (err) => {
                Materialize.toast('Cannot connect to server.', 3000);
                console.log(err);
            });
        }, (err) => {
            Materialize.toast('Cannot connect to server.', 3000);
            console.log(err);
        });

        TopicService.getTopicPosts($routeParams.topic)
        .then((res) => {
            $scope.posts = res.data;
        }, (err) => {
            Materialize.toast('Cannot load posts.', 3000);
            console.log(err);
        });
    }
})();
