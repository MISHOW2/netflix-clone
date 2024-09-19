// api.js

const apiKey = "ee6fd1c6d333c3b6966ad28fc92f9706";
const apiUrl = `https://api.themoviedb.org/3/movie/popular?api_key=${apiKey}`;
const genreApiUrl = `https://api.themoviedb.org/3/genre/movie/list?api_key=${apiKey}`;
const movieByGenreUrl = (genreId) => `https://api.themoviedb.org/3/discover/movie?api_key=${apiKey}&with_genres=${genreId}`;

// Fetch popular movies
export const getTrendingMovies = async () => {
  try {
    const response = await fetch(apiUrl);
    const data = await response.json();
    if (response.ok) {
      return data.results; // Return the list of movies
    } else {
      throw new Error("Failed to fetch popular movies");
    }
  } catch (error) {
    console.error(error);
    return [];
  }
};

// Fetch movie genres
export const getMovieGenres = async () => {
  try {
    const response = await fetch(genreApiUrl);
    const data = await response.json();
    if (response.ok) {
      return data.genres; // Return the list of genres
    } else {
      throw new Error("Failed to fetch movie genres");
    }
  } catch (error) {
    console.error(error);
    return [];
  }
};

// Fetch movies by genre
export const getMoviesByGenre = async (genreId) => {
  try {
    const response = await fetch(movieByGenreUrl(genreId));
    const data = await response.json();
    if (response.ok) {
      return data.results; // Return the list of movies by genre
    } else {
      throw new Error("Failed to fetch movies by genre");
    }
  } catch (error) {
    console.error(error);
    return [];
  }
};
