(() => {
    angular.module('app')
    .controller('ProfileCtrl', ['$scope', '$routeParams', '$window',
        '$rootScope', 'UserService', 'PostService', 'TopicService',
        'BoardService', profileController]);

    function profileController($scope, $routeParams, $window, $rootScope,
        UserService, PostService, TopicService, BoardService) {
        $scope.user = {};
        $scope.userProfile = {username: $routeParams.username}
        $scope.posts = [];
        $scope.userProfile.boardsByUser = [];
        $scope.subscribedBoards = [];
        $scope.username = '';
        $scope.password = '';
        $scope.description = '';
        $scope.board_name = '';

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

        UserService.getSubscribedTopics($scope.userProfile.username)
        .then((res) => {
            $scope.userProfile.topics = res.data;
        }, (err) => {
            Materialize.toast('Cannot connect to server.', 3000);
            console.log(err);
        });

        UserService.getPostsByUser($scope.userProfile.username)
        .then((res) => {
            $scope.posts = res.data;
        }, (err) => {
            Materialize.toast('Cannot connect to server.', 3000);
            console.log(err);
        });

        UserService.getBoardsByUser($scope.userProfile.username)
        .then((res) => {
            $scope.userProfile.boardsByUser = res.data;
        }, (err) => {
            Materialize.toast('Cannot connect to server.', 3000);
            console.log(err);
        });

        UserService.getSubscribedBoards($scope.userProfile.username)
        .then((res) => {
            $scope.subscribedBoards = res.data;
        }, (err) => {
            Materialize.toast('Cannot connect to server.', 3000);
            console.log(err);
        });

        $scope.createBoard = () => {
            console.log($scope.board_name)
            BoardService.createBoard($scope.board_name)
            .then((res) => {
                Materialize.toast('You created ' + $scope.board_name, 3000);

                UserService.getBoardsByUser($scope.userProfile.username)
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

        $scope.editUser = () => {
            UserService.editUser($scope.userProfile.username, $scope.username,
                $scope.password, $scope.description)
            .then((res) => {
                Materialize.toast('Changes saved.', 3000);
                $rootScope.$broadcast('change_username', $scope.username);
                $window.location.href = '/main#/user/' + $scope.username;
            }, (err) => {
                if (err.data.code === 'ER_DUP_ENTRY') {
                    Materialize.toast('Username already taken.', 3000);
                } else {
                    Materialize.toast('Oops! Something went wrong.', 3000);
                }
            });
        }
    }
})();
