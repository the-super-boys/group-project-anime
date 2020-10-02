'user strict';

const { fetchMovies } = require('../helpers/jikan-helper');

class JikanController {
  static async fetchJikans(req, res, next) {
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

module.exports = JikanController;
