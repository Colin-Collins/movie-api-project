$(document).ready(function () {
    const API_KEY = 'efe997958e3569e81c2f7e7ddc3b580a'; 
    const BASE_URL = 'https://api.themoviedb.org/3';

    $('#searchButton').click(function () {
        const query = $('#searchBox').val().trim();
        if (query) {
            searchMovies(query);
        } else {
            alert('Please enter a movie title.');
        }
    });

    function searchMovies(query) {
        $.ajax({
            url: `${BASE_URL}/search/movie`,
            method: 'GET',
            data: {
                api_key: API_KEY,
                query: query,
            },
            success: function (response) {
                displaySearchResults(response.results);
            },
            error: function () {
                alert('Error fetching search results.');
            }
        });
    }

    function displaySearchResults(movies) {
        $('#results').empty();
        $('#details').empty(); 
        if (movies.length === 0) {
            $('#results').append('<p>No results found.</p>');
            return;
        }
        movies.forEach((movie) => {
            const movieElement = `
                <div class="movie" data-id="${movie.id}">
                    <h3>${movie.title}</h3>
                    <p>Release Date: ${movie.release_date || 'N/A'}</p>
                </div>
            `;
            $('#results').append(movieElement);
        });

        $('.movie').click(function () {
            const movieId = $(this).data('id');
            getMovieDetails(movieId);
        });
    }
    function getMovieDetails(movieId) {
        $.ajax({
            url: `${BASE_URL}/movie/${movieId}`,
            method: 'GET',
            data: {
                api_key: API_KEY,
            },
            success: function (movie) {
                displayMovieDetails(movie);
            },
            error: function () {
                alert('Error fetching movie details.');
            }
        });
    }

    function displayMovieDetails(movie) {
        $('#details').html(`
            <h2>${movie.title}</h2>
            <p><strong>Overview:</strong> ${movie.overview || 'No overview available.'}</p>
            <p><strong>Release Date:</strong> ${movie.release_date || 'N/A'}</p>
            <p><strong>Genres:</strong> ${
                movie.genres.map((genre) => genre.name).join(', ') || 'N/A'
            }</p>
            <p><strong>Runtime:</strong> ${movie.runtime || 'N/A'} minutes</p>
            <img src="https://image.tmdb.org/t/p/w500${movie.poster_path}" alt="${movie.title} Poster">
        `);
    }
});