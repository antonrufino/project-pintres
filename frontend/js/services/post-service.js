(() => {
    angular
        .module('app')
        .factory('PostService', ['$http', '$q', PostService]);

    function PostService($http, $q) {
        function createPost(post) {
            let deferred = $q.defer();

            $http.post('/api/post', post)
            .then((res) => {
                console.log(res.data);
                deferred.resolve(res);
            }, (err) => {
                deferred.reject(err)
            });

            return deferred.promise;
        };

        function deletePost(id) {
            let deferred = $q.defer();

            $http.post('/api/post/remove', {id: id})
            .then((res) => {
                deferred.resolve(res);
            }, (err) => {
                deferred.reject(err)
            });

            return deferred.promise;
        };

        function editPost(post) {
            let deferred = $q.defer();

            $http.post('/api/post/edit', post)
            .then((res) => {
                deferred.resolve(res);
            }, (err) => {
                deferred.reject(err)
            });

            return deferred.promise;
        }

        function getPostBoards(id) {
            let deferred = $q.defer();

            $http.post('/api/post/' + id + '/boards')
            .then((res) => {
                deferred.resolve(res);
            }, (err) => {
                deferred.reject(err);
            });

            return deferred.promise;
        }

        function editPostBoards(id, boards) {
            let deferred = $q.defer();

            $http.post('/api/board/posts/remove', {
                post_id: id
            }).then((res) => {
                console.log("kek")
                for (b of boards) {
                    $http.post('/api/board/posts', {
                        board_id: b.board_id,
                        post_id: id
                    }).then((res) => {
                        console.log(res);
                        deferred.resolve(res);
                    }, (err) => {
                        console.log(err);
                        deferred.reject(err);
                    });
                }
            }, (err) => {
                console.log(err);
                deferred.reject(err);
            });

            return deferred.promise;
        }

        return {
            createPost: createPost,
            deletePost: deletePost,
            editPost: editPost,
            getPostBoards, getPostBoards,
            editPostBoards: editPostBoards
        };
    }
})();
