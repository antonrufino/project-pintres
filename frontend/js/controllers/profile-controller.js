(() => {
    angular.module('app')
    .controller('ProfileCtrl', ['$scope', '$routeParams', 'UserService',
        'PostService', 'TopicService', profileController]);

    function profileController($scope, $routeParams, UserService, PostService,
        TopicService) {
        $scope.user = {username: $routeParams.username}
        $scope.posts = [];
        $scope.boardsByUser = [];
        $scope.subscribedBoards = [];

        UserService.getSubscribedTopics($scope.user.username)
        .then((res) => {
            $scope.user.topics = res.data;
        }, (err) => {
            Materialize.toast('Cannot connect to server.', 3000);
            console.log(err);
        });

        UserService.getPostsByUser($scope.user.username)
        .then((res) => {
            $scope.posts = res.data;
        }, (err) => {
            Materialize.toast('Cannot connect to server.', 3000);
            console.log(err);
        });

        UserService.getBoardsByUser($scope.user.username)
        .then((res) => {
            $scope.boardsByUser = res.data;
        }, (err) => {
            Materialize.toast('Cannot connect to server.', 3000);
            console.log(err);
        });

        UserService.getSubscribedBoards($scope.user.username)
        .then((res) => {
            console.log(res.data);
            $scope.subscribedBoards = res.data;
        }, (err) => {
            Materialize.toast('Cannot connect to server.', 3000);
            console.log(err);
        });
    }
})();
