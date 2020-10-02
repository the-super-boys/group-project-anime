const gifRouter = require("express").Router()
const GifController = require("../controllers/GifController.js")

gifRouter.get("/", GifController.getGif)


module.exports = gifRouter