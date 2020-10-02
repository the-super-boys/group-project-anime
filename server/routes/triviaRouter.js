const triviaRouter = require('express').Router()
const TriviaController = require("../controllers/TriviaController")


triviaRouter.get("/", TriviaController.triviaShow)


module.exports = triviaRouter