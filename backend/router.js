const postController = require(__dirname + '/controllers/post-controller');
const authController = require(__dirname + '/controllers/auth-controller.js');

module.exports = (router) => {
    router.post('/api/login', authController.login);
    router.get('/api/login', authController.logintest);
    router.get('/api/logout', authController.logout);

    router.post('/api/post', postController.addPost);
    router.get('/api/post', postController.getAllPosts)
    router.get('/api/post/:id', postController.getPost);
    router.post('/api/post/remove', postController.deletePost);
    router.post('/api/post/edit', postController.editPost);

    router.all('*', (req, res) => {
        res.redirect(404, '/404.html');
    });

    return router;
}
