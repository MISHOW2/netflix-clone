const apiKey = "ee6fd1c6d333c3b6966ad28fc92f9706"; // Your API key
const apiUrl = `https://api.themoviedb.org/3/movie/popular?api_key=${apiKey}`;
     // Update the DOM elements with fetched movie data
 let movieName =  document.getElementById("name");
 let movieDescription  =  document.getElementById("description");
 let duration =    document.getElementById("duration");
 let movieImg = document.getElementById("movie-poster");
 let mainContnet = document.getElementById("main-content");
 let currentIndex = 0; // To keep track of the current movie index

 const getMovieData = async () => {
   try {
     const response = await fetch(apiUrl);
     const data = await response.json();
     const movies = data.results; // Array of movies
 
     if (movies.length === 0) {
       // Handle empty array case
       console.log("No movies found.");
       return;
     }
 
     const movie = movies[currentIndex]; // Get the movie at the current index
 
     console.log(data);
     
     movieName.innerHTML = movie.title;
     movieDescription.innerHTML = movie.overview;
     movieImg.src = `https://image.tmdb.org/t/p/w500${movie.poster_path}`;
   
     if (movie.runtime) {
       duration.innerHTML = `Duration: ${movie.runtime}`;
     } else {
       duration.innerHTML = "Time unknown";
     }
 
     // Update currentIndex to the next movie
     currentIndex = (currentIndex + 1) % movies.length;
 
   } catch (error) {
     console.error("Error fetching movie data:", error);
   }
 };
 
 // Change movie every 4 seconds
 setInterval(getMovieData, 10000);
 

const getGenre = async () => {
  const genreUrl = `https://api.themoviedb.org/3/genre/movie/list?api_key=${apiKey}`;

  try {
    const response = await fetch(genreUrl);
    const data = await response.json();

    const genreList = data.genres; // Array of genres
    const genreContainer = document.getElementById("genre-container").querySelector('ul');
    genreContainer.innerHTML = ""; // Clear the container before adding genres

    genreList.forEach(genre => {
      const genreButton = document.createElement('li');
      genreButton.classList.add('genre-btn');
      genreButton.textContent = genre.name;
      genreButton.dataset.genreId = genre.id; // Store genre id as data attribute
      genreContainer.appendChild(genreButton);
    });

    // Add event listener to newly created genre buttons
    genreContainer.querySelectorAll('.genre-btn').forEach(btn => {
      btn.addEventListener("click", () => {
        const genreId = btn.dataset.genreId;
        getMoviesByGenre(genreId);
      });
    });

  } catch (error) {
    console.error("Error fetching genres:", error);
  }
};

// Function to fetch and display movies of a specific genre

const getMoviesByGenre = async (genreId) => {
  const discoverUrl = `https://api.themoviedb.org/3/discover/movie?api_key=${apiKey}&with_genres=${genreId}`;

  try {
    const response = await fetch(discoverUrl);
    const data = await response.json();
    const movies = data.results;
    console.log(movies);

    // Update the existing movie elements in the DOM
    const movieGallery = document.querySelector('#movie-gallery');
    movieGallery.innerHTML = ''; // Clear the existing content

    movies.forEach(movie => {
      const movieCard = document.createElement('div');
      movieCard.classList.add('movie-card');

      movieCard.innerHTML = `
        <img src="https://image.tmdb.org/t/p/w500${movie.poster_path}" alt="${movie.title}" class="movie-poster">
        <h3 class="movie-title">${movie.title}</h3>
        <p class="movie-year">${movie.release_date.split("-")[0]}</p>
      `;

      movieGallery.appendChild(movieCard);
    });

  } catch (error) {
    console.error("Error fetching movies by genre:", error);
  }
};


getGenre(); // Call the function to fetch and display genres

