const router = require('express').Router();
const userRouter = require('./userRouter');
const movieRouter = require('./movie-router');
const axios = require('axios')

router.use('/users', userRouter);
router.use('/movies', movieRouter);
router.get("/trivia", (req, res, next) => {

    axios({
        method: "post",
        url: "https://opentdb.com/api.php?amount=1&category=31&type=boolean"
    })
        .then(response => {
            let trivia = response.data.results[0].question
            let answer = response.data.results[0].correct_answer
            res.status(200).json({
                trivia,
                answer
            })
        })
        .catch(err => next(err))
})

module.exports = router;

