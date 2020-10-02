var baseUrl = 'http://localhost:3452';
var IMAGE_BASE_URL = 'http://image.tmdb.org/t/p/';
var POSTER_SIZE = 'w500';

let movies = { movies: [] };
let isLoading;
let searchTerm = '';
let error;

//setup before functions
var typingTimer; //timer identifier
var doneTypingInterval = 3000; //time in ms, 5 second for example
var $input = $('#search-widget');

//on keyup, start the countdown
$input.on('keyup', function () {
  clearTimeout(typingTimer);
  typingTimer = setTimeout(doneTyping, doneTypingInterval);
});

//on keydown, clear the countdown
$input.on('keydown', function () {
  clearTimeout(typingTimer);
});

//user is "finished typing," do something
function doneTyping() {
  searchTerm = $('#search-widget').val();
  $('#movies-container').empty();
  alert(searchTerm);
  handleFetchMovies(false, searchTerm);
}

$(document).ready(function () {
  const sessionMovies = window.sessionStorage.getItem('anime_movies');
  if (sessionMovies) {
    console.log('Grabbing from sessionStorage.');
    curr_movies = JSON.parse(sessionMovies);
    console.log(curr_movies.movies);
    let moviesresult = curr_movies.movies;
    console.log(moviesresult.length);
    let output = '';
    $.each(moviesresult, function (key, val) {
      let image = `${val.poster_path}` && `${IMAGE_BASE_URL}${POSTER_SIZE}${val.poster_path}`;
      console.log(image);
      let movieId = val.id;
      let href = movieId ? `/movies/${movieId}` : '1';
      let src = image ? image : `./resources/img/no_image.jpg`;
      output = `
          <div class="wrapper">
            <a href="${href}">
              <img class="clickable" src="${src}" alt="moviethumb" />
            </a>
          </div>
        `;
      $('#movies-container').append(output);
    });
  } else {
    console.log('Grabbing from API.');
    searchTerm = 'Anime';
    handleFetchMovies(false, searchTerm);
  }
});

const handleFetchMovies = async (loadMore, searchTerm) => {
  try {
    isLoading = true;
    error = false;
    $.ajax({
      url: `${baseUrl}/movies/`,
      method: 'POST',
      data: {
        movies,
        loadMore,
        searchTerm,
      },
    })
      .done((res) => {
        movies.currentPage = res.anime_movies.currentPage;
        movies.heroImage = res.anime_movies.heroImage;
        movies.totalPages = res.anime_movies.totalPages;
        movies.movies = [];

        res.anime_movies.movies.map((movie) => {
          movies.movies.push(movie);
        });

        console.log(movies);

        console.log(movies.movies.length);

        if (movies.movies.length > 0) {
          window.sessionStorage.setItem('anime_movies', JSON.stringify(movies));
        }

        let output = '';
        $.each(movies.movies, function (key, val) {
          let image = `${val.poster_path}` && `${IMAGE_BASE_URL}${POSTER_SIZE}${val.poster_path}`;
          let movieId = val.id;
          let href = movieId ? `/movies/${movieId}` : '1';
          let src = image ? image : `./resources/img/no_image.jpg`;
          output = `
            <div class="wrapper">
              <a href="${href}">
                <img class="clickable" src="${src}" alt="moviethumb" />
              </a>
            </div>
          `;
          $('#movies-container').append(output);
        });
      })
      .fail((err) => {
        console.log(err, '<<<<<<<<<<<<<<<<< ERROR');
      });
  } catch (err) {
    error = true;
  }
  isLoading = false;
};

const handleLoadMore = () => handleFetchMovies(true, searchTerm);

// $('#search-widget').keyup(function (e) {
//   movies.anime_movies.movies = [];
//   searchTerm = $('#search-widget').val();
//   handleFetchMovies(false, searchTerm); /*.then((data) => {*/
//   // console.log(data.anime_movies);
//   // console.log(searchTerm);
//   // let moviesresult = data.anime_movies.movies;
//   // console.log(moviesresult.length);
//   // let output = '';
//   // $.each(moviesresult, function (key, val) {
//   //   let image = `${val.poster_path}` && `${IMAGE_BASE_URL}${POSTER_SIZE}${val.poster_path}`;
//   //   console.log(image);
//   //   let movieId = val.id;
//   //   let href = movieId ? `/movies/${movieId}` : '1';
//   //   let src = image ? image : `./resources/img/no_image.jpg`;
//   //   output = `
//   //       <div class="wrapper">
//   //         <a href="${href}">
//   //           <img class="clickable" src="${src}" alt="moviethumb" />
//   //         </a>
//   //       </div>
//   //     `;
//   //   $('#movies-container').append(output);
//   // });
//   // });
// });
