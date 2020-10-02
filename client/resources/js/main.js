let baseUrl = `http://localhost:3452`
var params = null;
var isLoading = null;
var error = null;
var movie = null;


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
  $("#trivia-page").hide()
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
      $("#correct-page").hide()
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

  $ans = 'False';

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
  };
});	
