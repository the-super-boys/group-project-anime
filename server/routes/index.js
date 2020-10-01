const router = require('express').Router()

const userRoute = require('./userRoute')
const animeRoute = require('./animeRoute')

// router.use('/animes', animeRoute)
router.use('/users', userRoute)


module.exports = router