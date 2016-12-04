const postController = require(__dirname + '/controllers/post-controller');
const authController = require(__dirname + '/controllers/auth-controller');
const userController = require(__dirname + '/controllers/user-controller');
const routeController = require(__dirname + '/controllers/route-controller');
const topicController = require(__dirname + '/controllers/topic-controller');
const boardController = require(__dirname + '/controllers/board-controller');
const boardPostController = require(__dirname + '/controllers/boardpost-controller');
const boardUserController = require(__dirname + '/controllers/boarduser-controller');

module.exports = (router) => {
    router.post('/api/login', authController.login);
    router.get('/api/logout', authController.logout);

    router.get('/api/user', userController.getUser);
    router.post('/api/user', userController.createUser);
    router.get('/api/user/:username/topics/subscribed', userController.getSubscribedTopics)

    router.get('/api/feed', postController.generateFeed);
    router.post('/api/post', postController.addPost);
    router.post('/api/post/remove', postController.deletePost);
    router.post('/api/post/edit', postController.editPost);

    router.post('/api/board', boardController.addBoard);
    router.get('/api/board', boardController.getAllBoards);
    router.get('/api/board/:id', boardController.searchBoard);
    router.post('/api/board/remove', boardController.deleteBoard);
    router.post('/api/board/edit', boardController.editBoard);

    router.post('/api/boardpost', boardPostController.addBoardPost);
    router.get('/api/boardpost', boardPostController.getAllBoardPosts);
    router.get('/api/boardpost/:id', boardPostController.searchBoardPost);
    router.post('/api/boardpost/remove', boardPostController.deleteBoardPost);

    router.post('/api/boarduser', boardUserController.addBoardUser);
    router.get('/api/boarduser', boardUserController.getAllBoardUsers)
    router.get('/api/boarduser/:id', boardUserController.searchBoardUser);
    router.post('/api/boarduser/remove', boardUserController.deleteBoardUser);

    router.post('/api/topic/:topic/subscribe', topicController.subscribe);
    router.post('/api/topic/:topic/unsubscribe', topicController.unsubscribe);
    router.get('/api/topic/:topic', topicController.getTopicPosts);

    router.get('/login', routeController.login)
    router.get('/main', routeController.main);
    router.get('/not-found', routeController.notFound)
    router.all('*', (req, res) => {
        res.status(404).redirect('/not-found');
    });

    return router;
}
