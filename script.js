$(document).ready(function () {
    const API_KEY = 'efe997958e3569e81c2f7e7ddc3b580a'; 
    const BASE_URL = 'https://api.themoviedb.org/3';

    $('#searchButton').click(function () {
        const query = $('#searchBox').val().trim();
        if (query) {
            searchMovies(query);
        } else {
            alert('Enter Text');
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
                alert('Error grabbing results');
            }
        });
    }

    function displaySearchResults(movies) {
        $('#results').empty();
        $('#details').empty(); 
        if (movies.length === 0) {
            $('#results').append('<p>No Results</p>');
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
                alert('Error grabbing details');
            }
        });
    }

    function displayMovieDetails(movie) {
        const title = movie.title || 'Title not available';
        const overview = movie.overview || 'No overview available.';
        const releaseDate = movie.release_date || 'N/A';
        const genres = movie.genres && movie.genres.length > 0 
            ? movie.genres.map(function(genre) { return genre.name; }).join(', ') 
            : 'N/A';
        const runtime = movie.runtime ? movie.runtime + ' minutes' : 'N/A';
        const poster = movie.poster_path 
            ? `https://image.tmdb.org/t/p/w500${movie.poster_path}` 
            : 'https://via.placeholder.com/500x750?text=No+Image';
        const detailsHTML = `
            <h2>${title}</h2>
            <p><strong>Overview:</strong> ${overview}</p>
            <p><strong>Release Date:</strong> ${releaseDate}</p>
            <p><strong>Genres:</strong> ${genres}</p>
            <p><strong>Runtime:</strong> ${runtime}</p>
            <img src="${poster}" alt="${title} Poster">
        `;
        $('#details').html(detailsHTML);
    }
});