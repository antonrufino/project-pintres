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
                    $scope.post.post_time = Date.now();

                    $http.post('/api/post', $scope.post)
                    .then((reponse) => {
                        let post = Object.assign({}, $scope.post);

                        Materialize.toast('Posted!', 3000);
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
