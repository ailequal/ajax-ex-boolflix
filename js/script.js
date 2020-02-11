$(document).ready(function () {

	// toggle hamburger-menu
	$(document).on('click', '.hamburger-icon', function () {
		$('body').toggleClass('overflow-y-hidden');
		$('.hamburger-menu').toggleClass('display-block');
	});

	// store genre option variable
	var genre = 'all';
	$(document).on('change', '.search .genre', function () {
		genre = $('.search .genre').val();
		console.log(genre);
		// filter by genre the .result
		filterByGenre(genre);
	});

	// store language option variable
	var language = 'it';
	$(document).on('change', '.search .language', function () {
		language = $('.search .language').val();
		console.log(language);
	});

	// click on the button 'cerca'
	$(document).on('click', '.search a', function () {
		// query is saved from the input field
		var query = $('.search input').val().toLowerCase();
		console.log(query);
		if (query !== '') {
			clearInput();
			clearResults();
			searchMovies(query, language, genre);
			searchTvShows(query, language, genre);
			setTimeout(function () {
				if ($('.results').text() === '') {
					noResults();
				}
			}, 1000);
		} else {
			clearResults();
			noInput();
		}
	});

	// press enter on the keyboard
	$('.search input').keydown(function () {
		if (event.which === 13 || event.keyCode === 13) {
			// query is saved from the input field
			var query = $('.search input').val().toLowerCase();
			console.log(query);
			if (query !== '') {
				clearInput();
				clearResults();
				searchMovies(query, language, genre);
				searchTvShows(query, language, genre);
				setTimeout(function () {
					if ($('.results').text() === '') {
						noResults();
					}
				}, 1000);
			} else {
				clearResults();
				noInput();
			}
		}
	});

});


// function
// search movies and print the results
function searchMovies(query, language, genre) {
	// ajax calling themoviedb.org api for searching movies (max 20 displayed)
	$.ajax({
		url: "https://api.themoviedb.org/3/search/movie",
		method: "GET",
		data: {
			api_key: '6258744f8a6314eddb8961371f91076e',
			language: language,
			query: query
		},
		success: function (data, state) {
			var movies = data.results;
			console.log(movies);
			printMovies(movies, genre);
		},
		error: function (request, state, error) {
			console.log(error);
		}
	});
}

// search every movie in the array and print them in the html
function printMovies(movies, genre) {
	var handlebars = handlebarsInit('#movie');
	// search every movies
	for (var i = 0; i < movies.length; i++) {
		var movie = movies[i];
		// convert raking in stars
		var vote = oneToX(movie.vote_average, 5, 10);
		var star = printStar(vote, 5);
		// convert original_language in flag
		var flag = convertFlag(movie.original_language);
		// add poster from api database if present
		var posterPath = addPoster(movie);
		// create object context for handlebars
		var context = {
			title: movie.title,
			original_language: flag,
			star: star,
			overview: movie.overview,
			poster_path: posterPath,
			genre_ids: movie.genre_ids
		};
		// check if the title is the same as the original title
		checkTitle(movie, context);
		// handlebars append
		var html = handlebars(context);
		$('.results').append(html);
		// filter by genre the .result
		filterByGenre(genre);
	}
}

// search tv shows and print the results
function searchTvShows(query, language, genre) {
	// ajax calling themoviedb.org api for searching tv shows (max 20 displayed)
	$.ajax({
		url: "https://api.themoviedb.org/3/search/tv",
		method: "GET",
		data: {
			api_key: '6258744f8a6314eddb8961371f91076e',
			language: language,
			query: query
		},
		success: function (data, state) {
			var tvShows = data.results;
			console.log(tvShows);
			printTvShows(tvShows, genre);
		},
		error: function (request, state, error) {
			console.log(error);
		}
	});
}

// search every tv shows in the array and print them in the html
function printTvShows(tvShows, genre) {
	var handlebars = handlebarsInit('#tv-show');
	// search every tv shows
	for (var i = 0; i < tvShows.length; i++) {
		var tvShow = tvShows[i];
		// convert raking in stars
		var vote = oneToX(tvShow.vote_average, 5, 10);
		var star = printStar(vote, 5);
		// convert original_language in flag
		var flag = convertFlag(tvShow.original_language);
		// add poster from api database if present
		var posterPath = addPoster(tvShow);
		// create object context for handlebars
		var context = {
			name: tvShow.name,
			original_language: flag,
			star: star,
			overview: tvShow.overview,
			poster_path: posterPath,
			genre_ids: tvShow.genre_ids
		};
		// check if the title is the same as the original title
		checkTitle(tvShow, context);
		// handlebars append
		var html = handlebars(context);
		$('.results').append(html);
		// filter by genre the .result
		filterByGenre(genre);
	}
}

// display a message when no movies or tv shows are found
function noResults() {
	var handlebars = handlebarsInit('#message');
	// handlebars append
	var context = {
		message: 'Nessun film o serie TV corrispondono alla ricerca effettuata'
	};
	var html = handlebars(context);
	$('.results').append(html);
}

// display a message when nothing is written in the input field
function noInput() {
	var handlebars = handlebarsInit('#message');
	// handlebars append
	var context = {
		message: 'Scrivi il nome di un film o una serie TV'
	};
	var html = handlebars(context);
	$('.results').append(html);
}

// handlebars init
function handlebarsInit(template) {
	var source = $(template).html();
	var template = Handlebars.compile(source);
	return template;
}

// convert a number based in y to based in x
function oneToX(number, x, y) {
	return Math.round((number * x) / y);
}

// print x full star and y empty star given a total amount
function printStar(x, total) {
	var star = '';
	for (var i = 0; i < total; i++) {
		if (i < x) {
			star += '<i class="fas fa-star"></i>';
		} else {
			star += '<i class="far fa-star"></i>';
		}
	}
	return star;
}

// convert language iso 639-1 to an emoji flag
function convertFlag(language) {
	if (language === 'it') {
		language = '🇮🇹';
	} else if (language === 'en') {
		language = '🇺🇸';
	} else if (language === 'fr') {
		language = '🇫🇷';
	} else if (language === 'de') {
		language = '🇩🇪';
	} else if (language === 'es') {
		language = '🇪🇸';
	} else {
		language = '🏳️';
	}
	return language;
}

// add a default poster if the response is null
function addPoster(object) {
	if (object.poster_path === null) {
		return 'img/no-poster.png';
	} else {
		return 'https://image.tmdb.org/t/p/w300' + object.poster_path;
	}
}

// check if the title is the same as the original title
function checkTitle(object, context) {
	if (object.title !== object.original_title) {
		context.original_title = object.original_title;
	}
}

// filter the results with the genre selected
function filterByGenre(genre) {
	$('.results .result').each(function () {
		// reset display to all the .result
		$(this).removeClass('display-none');
		// add .display-none if genre doesn't match
		if (!($(this).attr('data-attribute').includes(genre))) {
			$(this).addClass('display-none');
		}
	});
}

// clear .results field in the html
function clearResults() {
	$('.results').text('');
}

// clear input field after the click
function clearInput() {
	$('.search input').val('');
}


// to-do
// click and enter in the same condition (not possible??)
// movies are sorted by ranking
// search without enter, just type and automatically update the search (not really needed)
// ranking also with half stars
// show some actors