(() => {
    angular.module('app')
        .controller('PostCtrl', ['$scope', '$http',
            ($scope, $http) => {
                $scope.post = {
                    author_display_name: '',
                    author_username: '',
                    post_time: '',
                    content: '',
                    topic: ''
                };
                $scope.posts = [];

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
                    .then((reponse) => {
                        Materialize.toast('Posted!', 3000);
                        post.post_time = $scope.post.post_time;
                        $scope.posts.push(post);

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
            }
        ]);
})();
