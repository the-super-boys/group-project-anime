'use strict';

const router = require('express').Router();
const controller = require('../controllers/movie-controller');

router.get(/^\/(\d+)$/m, controller.fetchMovie);

router.post('/', controller.fetchMovies);

module.exports = router;
