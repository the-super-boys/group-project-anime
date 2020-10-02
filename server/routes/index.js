const router = require('express').Router();
const userRouter = require('./userRouter');
const authentication = require('../middlewares/authentication')
//const movieRouter = require('./movieRouter');
const triviaRouter = require('./triviaRouter');
const girRouter = require("./gifRouter")
const jikanRouter = require('./jikanRouter');

router.use('/users', userRouter);
router.use(authentication);
router.use('/jikans', jikanRouter);
router.use("/gif", girRouter);
//router.use('/movies', movieRouter);
router.use("/trivia", triviaRouter);
module.exports = router;

