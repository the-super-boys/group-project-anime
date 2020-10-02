'use strict';

const fetch = require('node-fetch');
const { POPULAR_BASE_URL, SEARCH_BASE_URL, API_URL, MOVIE_ENDPOINT, CREDITS_ENDPOINT } = require('../config/tmdb');

module.exports = {
  fetchMovies: async (movies = { movies: [] }, loadMore, searchTerm) => {
    let endpoint = searchTerm
      ? `${SEARCH_BASE_URL}${searchTerm}&page=${loadMore ? movies.currentPage + 1 : 1}`
      : `${POPULAR_BASE_URL}&page=${loadMore ? movies.currentPage + 1 : 1}`;

    let result = await (await fetch(endpoint)).json();

    return {
      ...movies,
      movies: loadMore ? [...movies.movies, ...result.results] : [...result.results],
      heroImage: movies.heroImage || result.results[0],
      currentPage: result.page,
      totalPages: result.total_pages,
    };
  },
  fetchMovie: async (movieId) => {
    const endpoint = MOVIE_ENDPOINT(movieId);
    const creditsEndpoint = CREDITS_ENDPOINT(movieId);

    const result = await (await fetch(endpoint)).json();
    const creditsResult = await (await fetch(creditsEndpoint)).json();

    const directors = creditsResult.crew.filter((member) => member.job === 'Director');

    return {
      ...result,
      actors: creditsResult.cast,
      directors,
    };
  },
};
