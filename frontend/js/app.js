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
        .when('/profile', {
            templateUrl: 'views/profile.html'
        });
    };
})();
