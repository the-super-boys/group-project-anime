const router = require('express').Router();
const userRouter = require('./userRouter');
const authentication = require('../middlewares/authentication')
const movieRouter = require('./movie-router');
const triviaRouter = require('./triviaRouter');
const girRouter = require("./gifRouter")

router.use('/users', userRouter);
router.use("/gif", girRouter)
router.use(authentication);
router.use('/movies', movieRouter);
router.use("/trivia", triviaRouter);

module.exports = router;

