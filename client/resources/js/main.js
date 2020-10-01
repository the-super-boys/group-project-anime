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
