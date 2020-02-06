$(document).ready(function (){

  // query
  var query = 'star wars';

  // ajax calling the themoviedb api for searching movies
  $.ajax({
    url: "https://api.themoviedb.org/3/search/movie",
    method: "GET",
    data: {
      api_key: '6258744f8a6314eddb8961371f91076e',
      query: query,
      language: 'it-IT'
    },
    success: function(data, state) {
      var movies = data.results;
      console.log(movies);
      searchPrintMovies(movies);
    },
    error: function(request, state, error) {
      console.log(error);
    }
  });

});


// function
// search every movie in the array and print them in the html
function searchPrintMovies(movies) {
  // handlebars init
  var source = $('#template').html();
  var template = Handlebars.compile(source);
  // search every movies
  for (var i = 0; i < movies.length; i++) {
    var movie = movies[i];
    // handlebars append
    var context = {
      title: movie.title,
      original_title: movie.original_title,
      original_language: movie.original_language,
      vote_average: movie.vote_average,
    };
    var html = template(context);
    $('.movies').append(html);
  }
}


// notes
// API Key (v3 auth)
// 6258744f8a6314eddb8961371f91076e

// search example
// https://api.themoviedb.org/3/search/movie?api_key=6258744f8a6314eddb8961371f91076e&query=back to the future

// movie object keys
// titolo = title
// titilo originale = original_title
// lingua = original_language
// voto = vote_average
