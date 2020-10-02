'user strict';

const fetch = require('node-fetch');

const { SEARCH_BASE_URL } = require('../config/jikan');

module.exports = {
    fetchMovies: async (movies = { movies: [] }, loadMore, searchTerm) => {
        console.log(JSON.stringify(movies), loadMore, searchTerm);

        let endpoint = `${SEARCH_BASE_URL}${searchTerm}&page=${loadMore ? movies.last_page + 1 : 1}`;

        let result = await (await fetch(endpoint)).json();

        return {
            ...result,
        };
    },
};