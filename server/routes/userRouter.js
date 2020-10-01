const user = require('../models/user');

const userRouter = require('express').Router();
const UserController = require('../controllers/UserController');

userRouter.post('/register', UserController.register);

module.exports = userRouter;
