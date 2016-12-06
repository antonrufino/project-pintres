(() => {
    angular.module('app')
    .directive('pinSidebar', () => {
        return {
            restrict: 'E',
            templateUrl: 'views/sidebar.html',
            controller: 'SidebarCtrl'
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
            templateUrl: 'views/new-post.html'
        }
    })
    .directive('pinDeletePost', () => {
        return {
            restrict: 'E',
            templateUrl: 'views/delete-post.html'
        };
    })
    .directive('pinEditPost', () => {
        return {
            restrict: 'E',
            templateUrl: 'views/edit-post.html'
        };
    })
    .directive('pinNewBoard', () => {
        return {
            restrict: 'E',
            templateUrl: 'views/new-board.html'
        };
    });
})();
