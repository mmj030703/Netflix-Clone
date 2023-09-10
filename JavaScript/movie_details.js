// Consts
const apiKey = "35a13243cc51617756240cd4b86cae9d";
const apiEndpoint = "https://api.themoviedb.org/3";
const imgEndpoint = "	https://image.tmdb.org/t/p/original";

const apiPaths = {
    fetchAllCategories: `${apiEndpoint}/genre/movie/list?api_key=${apiKey}`,
    fetchMoviesList: (categoryId) => `${apiEndpoint}/discover/movie?api_key=${apiKey}&with_genres=${categoryId}`,
    fetchTrendingMovies: `${apiEndpoint}/trending/movie/week?api_key=${apiKey}`,
    searchMovieById: (movieId) => `https://api.themoviedb.org/3/movie/${movieId}?api_key=${apiKey}`
};

const url = window.location.search;
const urlParams = new URLSearchParams(url);
const movieId = urlParams.get('movieId');

const res = fetch(apiPaths.searchMovieById(movieId));

res 
 .then(res => res.json())
 .then(movie => {
    console.log(movie);    
    const title = document.querySelector('.movie_title');
    const img = document.querySelector('.movie_image');

    title.textContent = movie.original_title;
    img.src = `${imgEndpoint}${movie.backdrop_path}`;
 })
 .catch(err => console.log(err));
