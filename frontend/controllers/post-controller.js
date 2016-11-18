(() => {
    angular.module('app')
    .controller('PostCtrl', ['$scope', '$http', postController]);

    function postController($scope, $http) {
        $scope.post = {
            id: '',
            post_time: '',
            content: '',
            topic: ''
        };
        $scope.posts = [];

        this.pendingId;

        $scope.setPending = (pendingId) => {
            this.pendingId = pendingId;
        }

        $scope.loadPosts = () => {
            $http.get('/api/post')
                .then((response) => {
                    $scope.posts = response.data;
                },
                (response) => {
                    Materialize.toast('Cannot load posts.', 3000);
                });
        };

        $scope.createPost = () => {
            let post = Object.assign({}, $scope.post);
            $scope.post.post_time = new Date();
            post.post_time = $scope.post.post_time
                .toISOString().slice(0, 19).replace('T', ' ');

            $http.post('/api/post', post)
            .then((response) => {
                Materialize.toast('Posted!', 3000);
                post.post_time = $scope.post.post_time;
                post.id = response.data.insertId;
                $scope.posts.push(post);
                console.log(post);

                $scope.post = {
                    author_display_name: '',
                    author_username: '',
                    post_time: '',
                    content: '',
                    topic: ''
                };
            }, (response) => {
                Materialize.toast('Oops! Something went wrong.', 3000);
                $scope.post = {
                    author_display_name: '',
                    author_username: '',
                    post_time: '',
                    content: '',
                    topic: ''
                };
            });
        };

        $scope.deletePost = () => {
            $http.post('/api/post/remove', {id: this.pendingId})
            .then((response) => {
                Materialize.toast('Post deleted.', 3000);

                for (let i = 0; i < $scope.posts.length; ++i) {
                    if ($scope.posts[i].id === this.pendingId) {
                        $scope.posts.splice(i, 1);

                        break;
                    }
                }
            }, (response) => {
                Materialize.toast('Oops! Something went wrong.', 3000);
            });
        };

        $scope.editPost = () => {
            $http.post('/api/post/edit', {
                id: this.pendingId,
                content: $scope.post.content,
                topic: $scope.post.topic
            }).then((response) => {
                Materialize.toast('Changes saved!', 3000);

                for (let i = 0; i < $scope.posts.length; ++i) {
                    if ($scope.posts[i].id === this.pendingId) {
                        $scope.posts[i].content = $scope.post.content;
                        $scope.posts[i].topic = $scope.post.topic;

                        break;
                    }
                }

                $scope.post = {
                    author_display_name: '',
                    author_username: '',
                    post_time: '',
                    content: '',
                    topic: ''
                };
            }), (response) => {
                Materialize.toast('Oops! Something went wrong.', 3000);
                $scope.post = {
                    author_display_name: '',
                    author_username: '',
                    post_time: '',
                    content: '',
                    topic: ''
                };
            }
        }
    }
})();
