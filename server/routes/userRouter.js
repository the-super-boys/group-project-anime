const userRouter = require('express').Router();
const UserController = require('../controllers/UserController');

userRouter.post('/register', UserController.register);
userRouter.post('/login', UserController.login);
userRouter.post('/googlesign', UserController.googleSign);

module.exports = userRouter;
