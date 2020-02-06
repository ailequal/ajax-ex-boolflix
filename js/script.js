$(document).ready(function (){

  // handlebars init
  var source = $('#template').html();
  var template = Handlebars.compile(source);

  // var
  var query = 'star wars';

  // ajax
  $.ajax({
    url: "https://api.themoviedb.org/3/search/movie",
    method: "GET",
    data: {
      api_key: '6258744f8a6314eddb8961371f91076e',
      query: query
    },
    success: function(data, state) {
      console.log(data.results);
      var movies = data.results;
      for (var i = 0; i < movies.length; i++) {
        var movie = movies[i];
        // handlebars append
        var context = {
          title: movie.title,
        };
        var html = template(context);
        $('.movies').append(html);
      }
    },
    error: function(request, state, error) {
      console.log(error);
    }
  });

});


// function
// empty


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
