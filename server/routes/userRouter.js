const user = require('../models/user');

const userRouter = require('express').Router();
const UserController = require('../controller/userController');

userRouter.post('/register', UserController.register);

module.exports = userRouter;
