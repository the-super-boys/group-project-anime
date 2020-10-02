const router = require('express').Router();
const userRouter = require('./userRouter');
const authentication = require('../middlewares/authentication')
const movieRouter = require('./movieRouter');
const triviaRouter = require('./triviaRouter');

router.use('/users', userRouter);
router.use(authentication);
router.use('/movies', movieRouter);
router.use("/trivia", triviaRouter);

module.exports = router;

