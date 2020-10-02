const gifRouter = require("express").Router()
const GifController = require("../controllers/GifController")

gifRouter.get("/", GifController.getGif)


module.exports = gifRouter