const apiKey = '88d9cb05f5c66bc47159ea1fabf2adfd';
const apiUrl = 'https://api.themoviedb.org/3';
const moviesContainer = document.getElementById('moviesContainer');
const modal = document.getElementById('modal');
const movieTitle = document.getElementById('movieTitle');
const movieInfo = document.getElementById('movieInfo');
const movieTrailer = document.getElementById('movieTrailer');

document.addEventListener('DOMContentLoaded', () => {
  fetchMovies();
});

function fetchMovies() {
  fetch(`${apiUrl}/movie/popular?api_key=${apiKey}`)
    .then(response => response.json())
    .then(data => displayMovies(data.results));
}

function searchMovies() {
  const query = document.getElementById('searchInput').value;
  fetch(`${apiUrl}/search/movie?api_key=${apiKey}&query=${query}`)
    .then(response => response.json())
    .then(data => displayMovies(data.results));
}

function displayMovies(movies) {
  moviesContainer.innerHTML = '';
  movies.forEach(movie => {
    const movieElement = document.createElement('div');
    movieElement.classList.add('movie');
    movieElement.innerHTML = `
      <img src="https://image.tmdb.org/t/p/w500${movie.poster_path}" alt="${movie.title}">
      <h3>${movie.title}</h3>
      <p>Rating: ${movie.vote_average}</p>
      <button onclick="fetchMovieDetails(${movie.id})">More Info</button>
    `;
    moviesContainer.appendChild(movieElement);
  });
}

function fetchMovieDetails(movieId) {
  fetch(`${apiUrl}/movie/${movieId}?api_key=${apiKey}`)
    .then(response => response.json())
    .then(data => {
      movieTitle.textContent = data.title;
      movieInfo.textContent = data.overview;
      fetchTrailer(movieId);
      openModal();
    });
}

function fetchTrailer(movieId) {
  fetch(`${apiUrl}/movie/${movieId}/videos?api_key=${apiKey}`)
    .then(response => response.json())
    .then(data => {
      const trailer = data.results.find(video => video.type === 'Trailer');
      if (trailer) {
        movieTrailer.src = `https://www.youtube.com/embed/${trailer.key}`;
      } else {
        movieTrailer.src = '';
        movieInfo.textContent += ' (Trailer not available)';
      }
    });
}

function openModal() {
  modal.style.display = 'flex';
}

function closeModal() {
  modal.style.display = 'none';
  movieTrailer.src = '';
}
