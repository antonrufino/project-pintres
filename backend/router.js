const postController = require(__dirname + '/controllers/post-controller');
const authController = require(__dirname + '/controllers/auth-controller');
const userController = require(__dirname + '/controllers/user-controller');
const routeController = require(__dirname + '/controllers/route-controller');

module.exports = (router) => {
    router.post('/api/login', authController.login);
    router.get('/api/logout', authController.logout);

    router.get('/api/user', userController.getUser);
    router.post('/api/user', userController.createUser);

    router.post('/api/post', postController.addPost);
    router.get('/api/post', postController.getAllPosts)
    router.get('/api/post/:id', postController.getPost);
    router.post('/api/post/remove', postController.deletePost);
    router.post('/api/post/edit', postController.editPost);

    router.get('/login', routeController.login)
    router.get('/main', routeController.main);
    router.get('/not-found', routeController.notFound)
    router.all('*', (req, res) => {
        res.status(404).redirect('/not-found');
    });

    return router;
}
