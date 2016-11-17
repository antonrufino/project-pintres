'use strict';

const authController = require(__dirname + '/../controllers/auth-controller.js');

module.exports = (router) => {
    router.post('/api/login', authController.login);
    router.get('/api/login', authController.logintest);

    return router;
}
