const postController = require(__dirname + '/controllers/post-controller');
const authController = require(__dirname + '/controllers/auth-controller');
const userController = require(__dirname + '/controllers/user-controller');
const routeController = require(__dirname + '/controllers/route-controller');
const topicController = require(__dirname + '/controllers/topic-controller');
const boardController = require(__dirname + '/controllers/board-controller');
const boardPostController = require(__dirname + '/controllers/boardpost-controller');
const boardUserController = require(__dirname + '/controllers/boarduser-controller');
const searchController = require(__dirname + '/controllers/search-controller');

module.exports = (router) => {
    router.post('/api/login', authController.login);
    router.get('/api/logout', authController.logout);

    router.get('/api/user', userController.getUser);
    router.post('/api/user', userController.createUser);
    router.get('/api/user/:username/topics/subscribed', userController.getSubscribedTopics);
    router.get('/api/user/:username/boards/subscribed', userController.getSubscribedBoards);
    router.get('/api/user/:username/boards', userController.getBoardsByUser)
    router.get('/api/user/:username/posts', userController.getPostsByUser);

    router.get('/api/feed', postController.generateFeed);
    router.post('/api/post', postController.addPost);
    router.post('/api/post/remove', postController.deletePost);
    router.post('/api/post/edit', postController.editPost);
    router.post('/api/post/:id/boards', postController.getPostBoards);

    router.post('/api/board', boardController.addBoard);
    router.get('/api/board/:id', boardController.getBoardData);
    router.post('/api/board/remove', boardController.deleteBoard);
    router.post('/api/board/edit', boardController.editBoard);
    router.post('/api/board/posts', boardPostController.addBoardPost);
    router.get('/api/board/:id/posts', boardController.getBoardPosts);
    router.post('/api/board/posts/remove', boardPostController.deleteBoardPost);
    router.post('/api/board/:id/subscribe', boardUserController.addBoardUser);
    router.post('/api/board/:id/subscribed', boardUserController.isSubscribed);
    router.post('/api/board/:id/unsubscribe', boardUserController.deleteBoardUser);

    router.post('/api/topic/:topic/subscribe', topicController.subscribe);
    router.post('/api/topic/:topic/unsubscribe', topicController.unsubscribe);
    router.get('/api/topic/:topic', topicController.getTopicPosts);

    router.get('/api/search/user', searchController.searchUser);
    router.get('/api/search/board', searchController.searchBoard);
    router.get('/api/search/topic', searchController.searchTopic);

    router.get('/login', routeController.login);
    router.get('/main', routeController.main);
    router.get('/not-found', routeController.notFound);

    router.all('*', (req, res) => {
        res.status(404).redirect('/not-found');
    });

    return router;
}
