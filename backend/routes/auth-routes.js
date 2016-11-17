'use strict';

const authController = require(__dirname + '/../controllers/auth-controller.js');

module.exports = (router) => {
    router.post('/login', authController.login);

    return router;
}
