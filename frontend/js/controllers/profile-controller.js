(() => {
    angular.module('app')
    .controller('ProfileCtrl', ['$scope', '$routeParams', 'UserService',
        'PostService', 'TopicService', 'BoardService', profileController]);

    function profileController($scope, $routeParams, UserService, PostService,
        TopicService, BoardService) {
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

        $scope.createBoard = () => {
            console.log($scope.board_name)
            BoardService.createBoard($scope.board_name)
            .then((res) => {
                console.log(res.data);
                Materialize.toast('You created ' + $scope.board_name);

                UserService.getBoardsByUser($scope.user.username)
                .then((res) => {
                    $scope.boardsByUser = res.data;
                }, (err) => {
                    Materialize.toast('Cannot connect to server.', 3000);
                    console.log(err);
                });

                BoardService.subscribe(res.data.insertId)
                .then((res) => {}, (err) => {
                    Materialize.toast('Cannot connect to server.', 3000);
                    console.log(err);
                });
            }, (err) => {
                if (err.data.code === 'ER_DUP_ENTRY') {
                    Materialize.toast('Already have a board with the same name.', 3000);
                } else {
                    Materialize.toast('Oops! Something went wrong.');
                }
            })
        }
    }
})();
