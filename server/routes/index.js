const router = require('express').Router();
const userRouter = require('./userRouter');
const authentication = require('../middlewares/authentication')
// const movieRouter = require('./movieRouter');
const triviaRouter = require('./triviaRouter');
const girRouter = require("./gifRouter")

router.use('/users', userRouter);
router.use("/gif", girRouter)
router.use("/trivia", triviaRouter);
router.use(authentication);
// router.use('/movies', movieRouter);

module.exports = router;

