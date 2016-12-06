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
    })
    .directive('pinEditBoard', () => {
        return {
            restrict: 'E',
            templateUrl: 'views/edit-board.html'
        };
    })
    .directive('pinDeleteBoard', () => {
        return {
            restrict: 'E',
            templateUrl: 'views/delete-board.html'
        };
    })
    .directive('pinManageBoards', () => {
        return {
            restrict: 'E',
            templateUrl: 'views/manage-boards.html'
        };
    })
    .directive('pinEditProfile', () => {
        return {
            restrict: 'E',
            templateUrl: 'views/edit-profile.html'
        }
    });
})();
