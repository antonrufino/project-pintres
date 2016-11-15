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
        })
        .directive('pinNewPost', () => {
            return {
                restrict: 'E',
                templateUrl: 'views/new-post.html',
                controller: 'PostCtrl'
            }
        })
        .directive('pinDeletePost', () => {
            return {
                restrict: 'E',
                templateUrl: 'views/delete-post.html',
                controller: 'PostCtrl'
            };
        });
})();
