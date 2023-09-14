// Consts
export const apiKey = "35a13243cc51617756240cd4b86cae9d";
export const youtubeApiKey = "AIzaSyCYijGNdXhv4kl23b7oFO24qynw9RguZjs";
export const apiEndpoint = "https://api.themoviedb.org/3";
export const imgEndpoint = "	https://image.tmdb.org/t/p/original";

export const apiPaths = {
    fetchAllCategories: `${apiEndpoint}/genre/movie/list?api_key=${apiKey}`,
    fetchMoviesList: (categoryId) => `${apiEndpoint}/discover/movie?api_key=${apiKey}&with_genres=${categoryId}`,
    fetchTrendingMovies: `${apiEndpoint}/trending/movie/week?api_key=${apiKey}`,
    searchMovieById: (movieId) => `https://api.themoviedb.org/3/movie/${movieId}?api_key=${apiKey}`,
    searchYoutubeTrailerId: (movieTitle) => `https://youtube.googleapis.com/youtube/v3/search?q=${movieTitle}+trailer&key=${youtubeApiKey}` //https://youtube.googleapis.com/youtube/v3/search?q=john%20wick%20chapter%204%20trailer&videoDuration=any&
};

export const url = window.location.search;
export const urlParams = new URLSearchParams(url);
export const movieId = urlParams.get('movieId');


// Function for fetching Similar Movies
const fetchSimilarMovies = (movieId) => {

}

// Function for fetching Cast Details
const fetchCastDetails = (movieId) => {

}

// Function to build Movie Details Section
const buildMovieDetailsSection = (movieObj) => {
    const movieDetailsSection = document.querySelector('.movie_details_section');
    const match = Math.floor(Math.random() * 100);
    const age = Math.floor(Math.random() * 18);
    const hours = Math.floor(movieObj.runtime / 60);
    const minutes = Math.floor(((movieObj.runtime / 60) - Math.floor(movieObj.runtime / 60)) * 60);

    movieDetailsSection.innerHTML = `
        <div class="movie_details_container container">
            <h2 class="movie_title">${movieObj.title}</h2>
            <div class="details">
                <div class="movie_details">
                    <div class="extra">
                        <span class="match">${match}% Match</span>
                        <span class="year_of_release">${movieObj.release_date.slice(0,4)}</span>
                        <p class='age_limit_box'><span class="age_limit">${age}+</span></p>
                        <span class='duration'>${hours}h ${minutes}m</span>
                        <p class='hd'><span class="quality">HD</span></p>
                    </div>
                    <div class="description">
                        <h2 class="heading">Overview</h2>
                        <p>${movieObj.overview}</p>
                    </div>
                </div>
                <div class="other_details">
                    <div class="genres">
                        <span>Genres: </span>
                        <ul class="movie_genres"></ul>
                    </div>
                    <div class="language">
                        <span>Available in: </span>
                        <span class="movie_language">${movieObj.spoken_languages[0].english_name}</span>
                    </div>
                </div>
            </div>
        </div>    
    `;

    // Inserting genres in the DOM
    const genres = movieObj.genres;
    const genresElement = movieDetailsSection.querySelector('.movie_genres');

    genres.slice(0,3).forEach(obj => {
        const li = document.createElement('li');
        li.textContent = obj.name;
        genresElement.append(li);
    });

    const languagesAvailable = {
        'de': 'German',
        'it': 'Italian',
        'la': 'Latin',
        'pl': 'Polish',
        'da': 'Danish',
        'no': 'Norwegian',
        'uk': 'Ukrainian',
        'en': 'English',
        'ca': 'Catalan',
        'hu': 'Hungarian',
        'kn': 'Kannada',
        'ru': 'Russian',
        'sv': 'Swedish',
        'ka': 'Georgian',
        'fi': 'Finnish',
        'fr': 'French',
        'fj': 'Fijian',
        'id': 'Indonesian',
        'gu': 'Gujarati',
        'ja': 'Japanese',
        'ko': 'Korean',
        'nl': 'Dutch',
        'el': 'Greek',
        'bn': 'Bengali',
        'ne': 'Nepali',
        'ur': 'Urdu',
        'ks': 'Kashmiri',
        'or': 'Oriya',
        'ar': 'Arabic',
        'tr': 'Turkish',
        'fa': 'Persian',
        'pa': 'Punjabi',
        'mr': 'Marathi',
        'pt': 'Portuguese',
        'hi': 'Hindi',
        'ht': 'Haitian',
        'ht': 'Haitian',
        'sa': 'Sanskrit',
        'te': 'Telugu',
        'ml': 'Malayalam',
        'es': 'Spanish',
        'he': 'Hebrew',
        'ta': 'Tamil',
    }

    // Inserting genres in the DOM
    const languageElement = movieDetailsSection.querySelector('.movie_language');
    const language = `${movieObj.original_language}`;
    
    if(languagesAvailable[language]) {
        languageElement.textContent = `${languagesAvailable[language]}`;
    }
    else {
        languageElement.remove();
    }
}

// Function for fetching movie details 
const fetchMovieDetails = (movieId) => {
    const res = fetch(apiPaths.searchMovieById(movieId));

    res
     .then(res => res.json())
     .then(movie => {
        buildMovieDetailsSection(movie)
     })
     .catch(error => console.error("Error : " + error));
}

const bootApp = async () => {
    Promise.all([
        fetchMovieDetails(movieId),
        fetchCastDetails(movieId),
        fetchSimilarMovies(movieId)
    ]);
}

window.addEventListener('load', (event) => {
    bootApp();
});
