(() => {
    angular.module('app')
    .factory('UserService', ['$http', UserService])

    function UserService($http) {
        return (user) => {
            $http.get('/api/user')
            .then((response) => {
                user.username = response.data.username;
                user.display_name = response.data.display_name;
            });
        }
    }
})();
