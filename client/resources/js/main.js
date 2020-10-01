
let baseUrl = `http://localhost:3000`

$(document).ready(function () {
  // Handler for .ready() called.
  console.log("Hello world")
});

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
      $("#first_name-register").val(""),
        $("#last_name-register").val(""),
        $("#email-register").val(""),
        $("#password-register").val(""),
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
var baseUrl = 'http://localhost:3452';
var params = null;
var isLoading = null;
var error = null;
var movie = null;

$(document).ready(function () {
  handleFetchMovie();
});

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

