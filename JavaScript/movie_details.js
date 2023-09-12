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

const bootApp = () => {
    window.addEventListener('scroll', (event) => {
        const scrollY = window.scrollY;
        const header = document.querySelector('header');
        
        if(scrollY > 5) {
            header.classList.add('black_bg');
        }
        else {
            header.classList.remove('black_bg');
        }
    });
}

window.addEventListener('load', (event) => {
    bootApp();
});
