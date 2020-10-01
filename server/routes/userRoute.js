const router = require('express').Router()
const Controller = require('../controller/userController')


router.post('/login', Controller.login)


module.exports = router