//API related stuff
const API_URL =
  "https://api.themoviedb.org/3/discover/movie?sort_by=popularity.desc&api_key=52b1bd238c68760fd08d982bb2f30e67&page=1";
const IMG_PATH = "https://image.tmdb.org/t/p/w1280";
const SEARCH_API = "https://api.themoviedb.org/3/search/movie?query=";
const options = {
  method: "GET",
  headers: {
    accept: "application/json",
    Authorization:
      "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI1MmIxYmQyMzhjNjg3NjBmZDA4ZDk4MmJiMmYzMGU2NyIsInN1YiI6IjY0NzE3YzA3YTE5OWE2MDExNmM2YjUyNCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.ULgUgcDy8eSiLC6od1jUXn3q3R0fLrazYV68dSlNsBk",
  },
};

//variables
const form = document.getElementById("form");
const search = document.getElementById("search");
const main = document.getElementById("main");

//Getting movies from API
const getMovies = async function (url, options) {
  try {
    const res = await fetch(url, options);
    const data = await res.json();
    showMovies(data.results);
    console.log(data);
  } catch (err) {
    console.log(err);
  }
};

//Determining whether a movie's rating is green, orange or red
function getClassByRate(vote) {
  if (vote >= 8) {
    return "green";
  } else if (vote >= 5) {
    return "orange";
  } else {
    return "red";
  }
}

//Inserting results in DOM
const showMovies = function (movies) {
  main.innerHTML = "";
  movies.forEach((movie) => {
    const { title, poster_path, vote_average, overview, release_date } = movie;

    const movieEl = document.createElement("div");
    movieEl.classList.add("movie");

    movieEl.innerHTML = `
    <img
    src="${IMG_PATH + poster_path}"
    alt="${title}"
  />
  <div class="movie-info">
    <h3>${title}</h3>
    <span class="${getClassByRate(vote_average)}">${
      Math.round(vote_average * 100) / 100
    }</span>
  </div>
  <div class="overview">
    <h3>Overview: ${title}</h3>
    ${overview}
    <div class="release-date">
    Released: ${release_date}
    </div>
  </div>
  `;
    main.appendChild(movieEl);
  });
};

//Search functionality
form.addEventListener("submit", (e) => {
  e.preventDefault();
  const searchTerm = search.value;
  if (searchTerm && searchTerm !== "") {
    getMovies(SEARCH_API + searchTerm, options);
    search.value = "";
  } else {
    window.location.reload();
  }
});

//Calling function
getMovies(API_URL);
