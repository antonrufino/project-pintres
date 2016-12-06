(() => {
    angular.module('app')
    .controller('FeedCtrl', ['$scope', 'UserService', 'PostService',
        'TopicService', 'FeedService', feedController]);

    function feedController($scope, UserService, PostService, TopicService,
        FeedService) {
        $scope.user = {}
        $scope.posts = [];
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

        FeedService.generateFeed()
        .then((res) => {
            $scope.posts = res.data;
        }, (err) => {
            Materialize.toast('Cannot generate feed.', 3000);
        });
    }
})();
