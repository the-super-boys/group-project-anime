'use strict';

const { fetchMovie } = require('../helpers/tmdb-helper');

class MovieController {
  static async fetchMovie(req, res, next) {
    const id = req.params[0];
    try {
      let movie = await fetchMovie(id);
      res.status(200).json(movie);
    } catch (err) {
      next(err);
    }
  }
}

module.exports = MovieController;
