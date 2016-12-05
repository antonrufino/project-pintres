(() => {
    angular.module('app', ['ngRoute'])
    .config(['$routeProvider', routes]);

    function routes($routeProvider) {
        $routeProvider
        .when('/', {
            redirectTo: '/feed'
        })
        .when('/feed', {
            templateUrl: 'views/feed.html',
            controller: 'FeedCtrl'
        })
        .when('/user/:username', {
            templateUrl: 'views/profile.html',
            controller: 'ProfileCtrl'
        })
        .when('/topic/:topic', {
            templateUrl: 'views/topic.html',
            controller: 'TopicCtrl'
        })
        .when('/board/:id', {
            templateUrl: 'views/board.html',
            controller: 'BoardCtrl'
        })
        .when('/search', {
            templateUrl: 'views/search.html',
            controller: 'SearchCtrl'
        })
        .otherwise({
            redirectTo: () => {
                window.location.href="/not-found";
            }
        });
    };
})();
