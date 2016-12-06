(() => {
    angular.module('app')
    .controller('BoardCtrl', ['$scope', '$routeParams', 'UserService',
        'PostService', 'BoardService', boardController]);

    function boardController($scope, $routeParams, UserService, PostService,
        BoardService) {
        $scope.user = {};
        $scope.board = {};
        $scope.posts = [];
        $scope.board.subscribedToBoard = false;

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

        BoardService.getBoardData($routeParams.id)
        .then((res) => {
            $scope.board = res.data;
        }, (err) => {
            Materialize.toast('Cannot load posts.', 3000);
            console.log(err);
        });

        BoardService.getBoardPosts($routeParams.id)
        .then((res) => {
            $scope.posts = res.data;
        }, (err) => {
            Materialize.toast('Cannot load posts.', 3000);
            console.log(err);
        });

        BoardService.isSubscribed($routeParams.id)
        .then((res) => {
            console.log(res.data.length);
            $scope.board.subscribedToBoard = res.data.length === 1;
        }, (err) => {
            Materialize.toast('Oops! Something went wrong.')
        })

        $scope.subscribe = () => {
            BoardService.subscribe($routeParams.id)
            .then((res) => {
                $scope.board.subscribedToBoard = true;
                Materialize.toast('You followed ' + $scope.board.name
                    + ' by ' + $scope.board.creator, 3000);
            }, (err) => {
                Materialize.toast('Oops! Something went wrong.')
            })
        }

        $scope.unsubscribe = () => {
            BoardService.unsubscribe($routeParams.id)
            .then((res) => {
                $scope.board.subscribedToBoard = false;
                Materialize.toast('You unfollowed ' + $scope.board.name
                    + ' by ' + $scope.board.creator, 3000);
            }, (err) => {
                Materialize.toast('Oops! Something went wrong.')
            })
        }

        $scope.editBoard = () => {
            BoardService.editBoard($scope.board.id, $scope.board_name)
            .then((res) => {
                $scope.board.name = $scope.board_name;
                Materialize.toast('Changes saved.', 3000);
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
