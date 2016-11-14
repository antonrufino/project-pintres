let postController = require(__dirname + '/controllers/post-controller');

module.exports = (router) => {
    router.post('/api/post', postController.addPost);
    router.get('/api/post', postController.getAllPosts)
    router.get('/api/post/:id', postController.getPost);

    return router;
}
