(() => {
    angular.module('app', [])
        .directive('pinSidebar', () => {
            return {
                restrict: 'E',
                templateUrl: 'views/sidebar.html'
            };
        })
        .directive('pinPostsContainer', () => {
            return {
                restrict: 'E',
                templateUrl: 'views/posts-container.html',
                controller: 'PostCtrl'
            }
        });
})();
