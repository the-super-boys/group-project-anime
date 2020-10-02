'use strict';

const { fetchMovie, fetchMovies } = require('../helpers/tmdb-helper');

class MovieController {
  static async fetchMovie(req, res, next) {
    let id = req.params[0];
    try {
      let movie = await fetchMovie(id);
      res.status(200).json(movie);
    } catch (err) {
      next(err);
    }
  }

  static async fetchMovies(req, res, next) {
    let loadMore = req.body.loadMore === 'true';
    let searchTerm = req.body.searchTerm;
    let movies = req.body.movies;
    try {
      let getMovies = await fetchMovies(movies, loadMore, searchTerm);
      res.status(200).json({ anime_movies: getMovies });
    } catch (err) {
      next(err);
    }
  }
}

module.exports = MovieController;
