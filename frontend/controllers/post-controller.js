(() => {
    angular.module('app')
    .controller('PostCtrl', ['$scope', 'UserService', 'PostService',
        postController]);

    function postController($scope, UserService, PostService) {
        UserService.getCurrentUserData()
        .then((res) => {
            $scope.username = res.data.username;
        }, (err) => {
            Materialize.toast('Cannot connect to server.', 3000);
            console.log(err);
        });

        $scope.posts = [];

        this.pendingId;

        $scope.setPending = (pendingId) => {
            this.pendingId = pendingId;
        }

        $scope.loadPosts = () => {
            PostService.loadPosts()
            .then((res) => {
                $scope.posts = res.data;
            }, (err) => {
                Materialize.toast('Cannot load posts.', 3000);
                console.log(err);
            })
        };

        $scope.createPost = () => {
            const post = {
                content: $scope.content,
                topic: $scope.topic
            }

            PostService.createPost(post)
            .then((res) => {
                Materialize.toast('Posted!', 3000);

                post.author_username = $scope.username;
                post.post_time = res.data.insertDate;

                $scope.posts.push(post);
            }, (err) => {
                Materialize.toast('Oops! Something went wrong.', 3000);
                console.log(err);
            })
        };

        $scope.deletePost = () => {
            PostService.deletePost(this.pendingId)
            .then((res) => {
                Materialize.toast('Post deleted.', 3000);

                for (let i = 0; i < $scope.posts.length; ++i) {
                    if ($scope.posts[i].id === this.pendingId) {
                        $scope.posts.splice(i, 1);
                        break;
                    }
                }
            }, (err) => {
                Materialize.toast('Oops! Something went wrong.', 3000);
                console.log(err);
            });
        };

        $scope.editPost = () => {
            const post = {
                id: this.pendingId,
                content: $scope.content,
                topic: $scope.topic
            };

            PostService.editPost(post)
            .then((res) => {
                Materialize.toast('Changes saved!', 3000);

                for (let i = 0; i < $scope.posts.length; ++i) {
                    if ($scope.posts[i].id === this.pendingId) {
                        $scope.posts[i].content = $scope.post.content;
                        $scope.posts[i].topic = $scope.post.topic;

                        break;
                    }
                }
            }), (response) => {
                Materialize.toast('Oops! Something went wrong.', 3000);
                console.log(err);
            }
        }
    }
})();
