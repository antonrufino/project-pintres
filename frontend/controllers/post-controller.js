(() => {
    angular.module('app')
        .controller('PostCtrl', ['$scope', '$http',
                ($scope, $http) => {
                $scope.posts = [];
                $scope.loadPosts = () => {
                    $http.get('/api/post')
                        .then((response) => {
                            $scope.posts = response.data;
                        },
                        (response) => {
                            console.log(response.statusText);
                        });
                }
            }
        ]);
})();
