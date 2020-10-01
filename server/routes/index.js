const router = require('express').Router()
const axios = require('axios')
const userRoute = require('./userRoute')
const animeRoute = require('./animeRoute')

// router.use('/animes', animeRoute)
router.use('/users', userRoute)

//api trivia
router.get("/trivia", (req, res, next) => {

    axios({
        method: "post",
        url: "https://opentdb.com/api.php?amount=4&category=31&type=boolean"
    })
        .then(response => {
            let trivia = response.data
            res.status(200).json({
                trivia
            })
        })
        .catch(err => next(err))
})


module.exports = router