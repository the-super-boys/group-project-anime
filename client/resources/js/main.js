let baseUrl = `http://localhost:3452`
var params = null;

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

function initMovie() {
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
}

$(document).ready(function () {
  // Handler for .ready() called.
  console.log("Hello world")
  if (localStorage.token) {
    afterLogin();
  } else {
    beforeLogin();
  }
});

$("#cancel-register").click(event => {
  event.preventDefault();
  $("#first_name-register").val("");
  $("#last_name-register").val("");
  $("#email-register").val("");
  $("#password-register").val("");
  $("#register-page").hide()
  $("#login-page").show()
})

$("#register-link").click(event => {
  event.preventDefault();
  $("#login-page").hide()
  $("#register-page").show()
})

function beforeLogin() {
  $("#login-page").show()
  $("#register-page").hide()
  $("#trivia-page").hide()
  $("#home-page").hide()
}

function afterLogin() {
  $("#login-page").hide()
  $("#register-page").hide()
  $("#home-page").show()
  $("#correct-page").hide()
  $("#incorrect-page").hide()
  initMovie() // ini untuk inisialisasi movies pada saat masuk homepage
  $.ajax({
    method: "get",
    url: `${baseUrl}/trivia`
  })
    .done(trivia => {
      $("#trivia-page").append(`
        <div class="row justify-content-center">
        <div class="card">
        <h5 class="card-header">Trivia Question</h5>
        <div class="card-body">
          <p class="card-text">${trivia.trivia}</p>
          <a id="btn-trivia-yes" class="btn btn-primary">Yes</a>
          <a id="btn-trivia-no" class="btn btn-primary">No</a>
        </div>
        </div>
        </div>
        ` );
      $("#trivia-page").show()

    })
    .fail(err => {
      console.log(err.responseJSON.errors, ">>>>ERROR REGISTER")
    })
}

function register(event) {
  event.preventDefault()
  $("#error-alert-register").empty()
  let newUserObj = {
    first_name: $("#first_name-register").val(),
    last_name: $("#last_name-register").val(),
    email: $("#email-register").val(),
    password: $("#password-register").val(),
  }
  $.ajax({
    method: "POST",
    url: `${baseUrl}/users/register`,
    data: newUserObj
  })
    .done(result => {
      $("#first_name-register").val("");
      $("#last_name-register").val("");
      $("#email-register").val("");
      $("#password-register").val("");
      $("#register-page").hide();
      $("#login-page").show()
      console.log(result, ">>>>>>REGISTER SUCCESS")
    })
    .fail(error => {
      $.each(error.responseJSON.errors, function (key, value) {
        $("#error-alert-register").append(`
        <div class="alert alert-warning alert-dismissible fade show" role="alert">
        <strong>Errors!</strong> ${value}
        <button type="button" class="close" data-dismiss="alert" aria-label="Close">
          <span aria-hidden="true">&times;</span>
        </button>
        </div>
        ` );
      });
      console.log(error, ">>>>ERROR REGISTER")
    })
}

const handleFetchMovie = async (event) => {
  try {
    isLoading = true;
    error = false;
    $.ajax({
      type: 'GET',
      url: `${baseUrl}/movies/500`,
    })
      .done((res) => {
        movie = res;
        window.localStorage.setItem('moviedata', JSON.stringify(movie));
        $('movie-container').html = JSON.stringify(movie);
      })
      .fail((err) => {
        error = true;
        console.log(err);
      });
  } catch (err) {
    error = true;
    console.log(err);
  }
};

const handleFetchMovies = async (loadMore, searchTerm) => {
  try {
    isLoading = true;
    error = false;
    $.ajax({
      url: `${baseUrl}/movies/`,
      method: 'POST',
      headers: {
        token: localStorage.getItem("token")
      },
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

function login(event) {
  event.preventDefault();
  let email = $("#login-email").val();
  let password = $("#login-password").val();
  $.ajax({
    url: `${baseUrl}/users/login`,
    method: "POST",
    data: {
      email,
      password
    }
  })
    .done(data => {
      console.log(data, '<<<<<<<<<<<<<<<<< data login');
      localStorage.setItem("token", data.token)
      $("#login-email").val("");
      $("#login-password").val("");
      afterLogin()

    })
    .fail(err => {
      console.log(err.responseJSON.errors, '<<<<<<<<<<<<<<<<< error login');
    })
}

function logout(event) {
  event.preventDefault()
  let auth2 = gapi.auth2.getAuthInstance();
  auth2.signOut().then(function () {
    console.log('User signed out.');
  });
  localStorage.clear();
  beforeLogin()
}

//google sign-in
function onSignIn(googleUser) {
  var tokenGoogle = googleUser.getAuthResponse().id_token;
  $.ajax({
    url: baseUrl + "/users/googlesign",
    method: "POST",
    data: {
      tokenGoogle
    }
  })
    .done(res => {
      localStorage.setItem("token", res.token)
      afterLogin()
    })
    .fail(err => {
      console.log(err, "error google")
    })
}


$(function () {
  var loading = $('#loadbar').hide();
  $(document)
    .ajaxStart(function () {
      loading.show();
    }).ajaxStop(function () {
      loading.hide();
    });

  $("label.btn").on('click', function () {
    var choice = $(this).find('input:radio').val();
    $('#loadbar').show();
    $('#quiz').fadeOut();
    setTimeout(function () {
      $("#answer").html($(this).checking(choice));
      $('#loadbar').fadeOut();
      /* something else */
    }, 1500);
  });

  $ans = "False";


  $.fn.checking = function (ck) {
    if (ck != $ans)
      return $("#incorrect-page").show(), setTimeout(() => {
        $('#correct-page').hide(),
          $('#trivia-page').fadeOut();
      }, 2000);
    else
      return $("#correct-page").show(), setTimeout(() => {
        $('#correct-page').hide(),
          $('#trivia-page').fadeOut();
      }, 2000);
  }
})