(() => {
    angular.module('app')
    .controller('SearchCtrl', ['$scope', '$routeParams', 'SearchService',
        searchController]);

    function searchController($scope, $routeParams, SearchService) {
        $scope.keyword = $routeParams.keyword;
        $scope.users = [];
        $scope.boards = [];
        $scope.topics = [];

        //$scope.search = () => {
            SearchService.searchUser($scope.keyword)
            .then((res) => {
                $scope.users = res.data;
            }, (err) => {
                Materialize.toast('Cannot connect to server.', 3000);
                console.log(err);
            });

            SearchService.searchBoard($scope.keyword)
            .then((res) => {
                $scope.boards = res.data;
            }, (err) => {
                Materialize.toast('Cannot connect to server.', 3000);
                console.log(err);
            });

            SearchService.searchTopic($scope.keyword)
            .then((res) => {
                $scope.topics = res.data;
            }, (err) => {
                Materialize.toast('Cannot connect to server.', 3000);
                console.log(err);
            });
        //}
    }
})();
