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
      language: language,
      query: query,
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
  var handlebars = handlebarsInit('#template');
  // search every movies
  for (var i = 0; i < movies.length; i++) {
    var movie = movies[i];
    var vote = oneToX(movie.vote_average, 5, 10);
    var star = printStar(vote, 5);
    // check if the title is the same as the original title
    if (movie.title === movie.original_title) {
      var context = {
        title: movie.title,
        original_language: movie.original_language,
        star: star,
      };
    } else {
      var context = {
        title: movie.title,
        original_title: movie.original_title,
        original_language: movie.original_language,
        star: star,
      };
    }
    // handlebars append
    var html = handlebars(context);
    $('.movies').append(html);
  }
}

// display a message when no movies are found
function noMovies() {
  var handlebars = handlebarsInit('#template');
  // handlebars append
  var context = {
    title: 'Nessun film trovato'
  };
  var html = handlebars(context);
  $('.movies').append(html);
}

// display a message when nothing is written in the input field
function noInput() {
  var handlebars = handlebarsInit('#template');
  // handlebars append
  var context = {
    title: 'Scrivi il nome di un film'
  };
  var html = handlebars(context);
  $('.movies').append(html);
}

// handlebars init
function handlebarsInit(template) {
  var source = $(template).html();
  var template = Handlebars.compile(source);
  return template;
}

// clear movies field in the html
function clearMovies() {
  $('.movies').text('');
}

// clear input field after the click
function clearInput() {
  $('.search input').val('');
}

// convert a number based in y to based in x
function oneToX(number, x, y) {
  return Math.round((number * x) / y);
}

// print x full star and y empty star given a total amount
function printStar(x, total) {
  var star = '';
  for (var i = 0; i < x; i++) {
    star += '<i class="fas fa-star"></i>';
  }
  for (var i = 0; i < (total - x); i++) {
    star += '<i class="far fa-star"></i>';
  }
  return star;
}


// notes
// to-do
// click and enter in the same condition
// movies are sorted by ranking
// search without enter, just type and automatically update the search
// ranking also with half stars

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
