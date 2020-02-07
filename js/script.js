$(document).ready(function (){

  // store language option variable
  var language = 'it';
  $(document).on('change', '.search select', function() {
    language = $('.search select').val();
    console.log(language);
  });

  // click on the button 'cerca'
  $(document).on('click', '.search button', function() {
    // query is saved from the input field
    var query = $('.search input').val().toLowerCase();
    console.log(query);
    if (query !== '') {
      clearInput();
      clearMovies();
      searchMovies(query, language);
    } else {
      clearMovies();
      noInput();
    }
  });

  // press enter on the keyboard
  $('.search input').keydown(function() {
    if (event.which === 13 || event.keyCode === 13) {
      // query is saved from the input field
      var query = $('.search input').val().toLowerCase();
      console.log(query);
      if (query !== '') {
        clearInput();
        clearMovies();
        searchMovies(query, language);
      } else {
        clearMovies();
        noInput();
      }
    }
  });

});


// function
// search and print the results
function searchMovies(query, language) {
  // ajax calling themoviedb.org api for searching movies (max 20 displayed)
  $.ajax({
    url: "https://api.themoviedb.org/3/search/movie",
    method: "GET",
    data: {
      api_key: '6258744f8a6314eddb8961371f91076e',
      query: query,
      language: language
    },
    success: function(data, state) {
      var movies = data.results;
      console.log(movies);
      if (movies.length !== 0) {
        printMovies(movies);
      } else {
        noMovies();
      }
    },
    error: function(request, state, error) {
      console.log(error);
    }
  });
}

// search every movie in the array and print them in the html
function printMovies(movies) {
  // handlebars init
  var source = $('#template').html();
  var template = Handlebars.compile(source);
  // search every movies
  for (var i = 0; i < movies.length; i++) {
    var movie = movies[i];
    // check if the title is the same as the original title
    if (movie.title === movie.original_title) {
      var context = {
        title: movie.title,
        original_language: movie.original_language,
        vote_average: movie.vote_average,
      };
    } else {
      var context = {
        title: movie.title,
        original_title: movie.original_title,
        original_language: movie.original_language,
        vote_average: movie.vote_average,
      };
    }
    // handlebars append
    var html = template(context);
    $('.movies').append(html);
  }
}

// display a message when no movies are found
function noMovies() {
  // handlebars init
  var source = $('#template').html();
  var template = Handlebars.compile(source);
  // handlebars append
  var context = {
    title: 'Nessun film trovato'
  };
  var html = template(context);
  $('.movies').append(html);
}

// display a message when nothing is written in the input field
function noInput() {
  // handlebars init
  var source = $('#template').html();
  var template = Handlebars.compile(source);
  // handlebars append
  var context = {
    title: 'Scrivi il nome di un film'
  };
  var html = template(context);
  $('.movies').append(html);
}

// clear movies field in the html
function clearMovies() {
  $('.movies').text('');
}

// clear input field after the click
function clearInput() {
  $('.search input').val('');
}

// handlebars init (doesn't work)
// function handlebarsInit() {
//   var source = $('#template').html();
//   var template = Handlebars.compile(source);
//   return template;
// }


// notes
// to-do
// handlebars init doesn't work
// click and enter in the same condition
// movies are sorted by ranking
// search without enter, just type and automatically update the search

// to fix
// empty

// API Key (v3 auth)
// 6258744f8a6314eddb8961371f91076e

// search example
// https://api.themoviedb.org/3/search/movie?api_key=6258744f8a6314eddb8961371f91076e&query=back to the future

// movie object keys
// titolo = title
// titilo originale = original_title
// lingua = original_language
// voto = vote_average
