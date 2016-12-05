(() => {
    angular.module('app')
    .controller('PostCtrl', ['$scope', 'UserService', 'PostService',
        'TopicService', 'FeedService', postController]);

    function postController($scope, UserService, PostService, TopicService) {
        $scope.setPending = (post) => {
            this.pending = post.id;
            $scope.content = post.content;
            $scope.topic = post.topic;
        }

        $scope.createPost = () => {
            const post = {
                content: $scope.content,
                topic: $scope.topic
            }

            PostService.createPost(post)
            .then((res) => {
                Materialize.toast('Posted!', 3000);

                post.author_username = $scope.user.username;
                post.post_time = res.data.insertDate;

                $scope.posts.unshift(post);
            }, (err) => {
                Materialize.toast('Oops! Something went wrong.', 3000);
                console.log(err);
            })
        };

        $scope.deletePost = () => {
            PostService.deletePost(this.pending)
            .then((res) => {
                Materialize.toast('Post deleted.', 3000);

                for (let i = 0; i < $scope.posts.length; ++i) {
                    if ($scope.posts[i].id === this.pending) {
                        $scope.posts.splice(i, 1);
                        break;
                    }
                }
            }, (err) => {
                Materialize.toast('Oops! Something went wrong.', 3000);
                console.log(err);
            });
        };

        $scope.editPost = () => {
            const post = {
                id: this.pending,
                content: $scope.content,
                topic: $scope.topic
            };

            PostService.editPost(post)
            .then((res) => {
                Materialize.toast('Changes saved!', 3000);

                for (let i = 0; i < $scope.posts.length; ++i) {
                    if ($scope.posts[i].id === this.pending) {
                        $scope.posts[i].content = post.content;
                        $scope.posts[i].topic = post.topic;

                        break;
                    }
                }
            }, (err) => {
                Materialize.toast('Oops! Something went wrong.', 3000);
                console.log(err);
            });
        }

        $scope.subscribeToTopic = (topic) => {
            TopicService.subscribe($scope.user.username, topic)
            .then((res) => {
                Materialize.toast('You subscribed to ' + topic, 3000);
                $scope.user.topics.push({topic: topic});
            }, (err) => {
                if (err.data.code === 'ER_DUP_ENTRY') {
                    Materialize.toast('You\'re already subscribed to ' + topic,
                        3000);
                } else {
                    Materialize.toast('Oops! Something went wrong.', 3000);
                }
            });
        }

        $scope.unsubscribeFromTopic = (topic) => {
            TopicService.unsubscribe($scope.user.username, topic)
            .then((res) => {
                Materialize.toast('You unsubscribed from ' + topic, 3000);
                for (let i = 0; i < $scope.user.topics.length; ++i) {
                    if ($scope.user.topics[i].topic === topic) {
                        $scope.user.topics.splice(i, 1);
                    }
                }
            }, (err) => {
                if (err.data.code === 'ER_DUP_ENTRY') {
                    Materialize.toast('You\'re not subscribed to ' + topic,
                        3000);
                } else {
                    Materialize.toast('Oops! Something went wrong.', 3000);
                }
            });
        }

        $scope.isSubscribedToTopic = (topic) => {
            if ($scope.user.topics === undefined) return false;
            for (let t of $scope.user.topics) {
                if (t.topic === topic) return true;
            }
            return false;
        }
    }
})();
