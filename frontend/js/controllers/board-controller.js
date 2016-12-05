(() => {
    angular.module('app')
    .controller('BoardCtrl', ['$scope', '$routeParams', 'UserService',
        'PostService', 'BoardService', boardController]);

    function boardController($scope, $routeParams, UserService, PostService,
        BoardService) {
        $scope.user = {};
        $scope.posts = [];
        $scope.board_name = $routeParams.name;

        UserService.getCurrentUserData()
        .then((res) => {
            $scope.user.username = res.data.username;

            UserService.getSubscribedTopics(res.data.username)
            .then((res) => {
                $scope.user.topics = res.data;
            }, (err) => {
                Materialize.toast('Cannot connect to server.', 3000);
                console.log(err);
            })
        }, (err) => {
            Materialize.toast('Cannot connect to server.', 3000);
            console.log(err);
        });

        BoardService.getBoardPosts($routeParams.id)
        .then((res) => {
            $scope.posts = res.data;
        }, (err) => {
            Materialize.toast('Cannot load posts.', 3000);
            console.log(err);
        });
    }
})();
