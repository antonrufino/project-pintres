(() => {
    angular.module('app')
        .controller('PostCtrl', ['$scope', '$http',
            ($scope, $http) => {
                $scope.post = {
                    id: '',
                    author_display_name: '',
                    author_username: '',
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
                            console.log(response.statusText);
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
                        Materialize.toast('Post failed.', 3000);
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
                    }), (response => {
                        Materialize.toast('An error occured', 3000);
                    });
                };
            }
        ]);
})();
