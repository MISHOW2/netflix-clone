// dom.js

// Update movie details on the page
export const updateMovieDetails = (movie) => {
  document.getElementById("move-name").innerHTML = movie.original_title;
  document.getElementById("movie-description").innerHTML = movie.overview;

  const posterPath = movie.poster_path;
  const imageUrl = `https://image.tmdb.org/t/p/w500${posterPath}`;
  document.getElementById("movie-poster").src = imageUrl;
};

// Display movie genres
export const displayMovieGenres = (genres) => {
  const categoryElement = document.querySelector('.categoryName');
  categoryElement.innerHTML = ""; // Clear existing genres

  genres.forEach((genre) => {
    const genreBtn = document.createElement("button");
    genreBtn.innerHTML = genre.name;
    genreBtn.classList.add('genre-btn');
    genreBtn.setAttribute("data-id", genre.id);
    categoryElement.appendChild(genreBtn);
  });
};

// Attach event listeners for genre buttons
export const attachGenreEventListeners = (callback) => {
  const genreButtons = document.querySelectorAll('.genre-btn');
  genreButtons.forEach((button) => {
    button.addEventListener("click", () => {
      const genreId = button.getAttribute("data-id");
      callback(genreId); // Trigger the callback to fetch movies by genre
    });
  });
};
