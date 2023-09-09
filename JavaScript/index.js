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

const buildMoviesCategorySection = (movieObj, categoryName) => {
    const movieCategoriesSection = document.querySelector('.movie_categories_section');

    const moviesContainer = document.createElement('div');
    moviesContainer.classList.add('movie_container', 'container'); 

    const moviesListElement = movieObj.map(movie => {
        const movieTitle = movie.title.length > 30 ? movie.title.slice(0,30) + '...' : movie.title;

        return `
            <div class="movie_item">
                <img class="movie_image" src="${imgEndpoint}${movie.backdrop_path}">
                <p class="movie_name">${movieTitle}</p>
                <div class="extra">
                    <div class="buttons">
                        <div class="left_btns">
                            <i class="like fa-regular fa-thumbs-up"></i>                
                            <i class="wishlist fa-regular fa-plus"></i>                         
                        </div>                    
                        <div class="right_btns">
                            <i id='prev' class="more_details fa-solid fa-angle-down"></i>                        
                        </div>                    
                    </div>
                    <div class="movie_data">
                        <span class="match">100% Match</span>     
                        <p class='age_limit_box'><span class="age_limit">10+</span></p> 
                        <span class='duration'>2h 30m</span>
                        <p class='hd'><span class="quality">HD</span></p> 
                    </div>    
                    <ul class="movie_genres"></ul>           
                </div>
            </div>
        `;
    }).join('');

    moviesContainer.innerHTML = `
    <i id='prev' class="prev_button fa-solid fa-angle-left"></i>
    <h3 class="category_heading">${categoryName}<span class="explore">Explore more <i class="fa-solid fa-angle-right"></i></span></h3>
        <div class="movies_list">
            ${moviesListElement}
        </div>
    <i id='next' class="next_button fa-solid fa-angle-right"></i>
    `;

    movieCategoriesSection.appendChild(moviesContainer);

    Array.from(movieCategoriesSection.children).forEach(movieCategory => {
        const movieItems = movieCategory.querySelectorAll('.movie_item');
    
        for(let movieItemInd = 0; movieItemInd < movieItems.length; movieItemInd++) {
            movieItems[movieItemInd].addEventListener('mouseenter', (event) => {
                event.stopImmediatePropagation();

                // Changing match percentage
                const matchElement = movieItems[movieItemInd].querySelector('.match');
                const match = Math.floor(Math.random() * 100);
                matchElement.textContent = `${match}% Match`;

                // Changing movie duration
                let movieDuration = null;
                const movieId = movieObj[movieItemInd].id;
                const res = fetch(apiPaths.searchMovieById(movieId));
                res
                .then(res => res.json())
                .then(res => {
                    movieDuration = res.runtime;
                    
                    const movieDurationElement = movieItems[movieItemInd].querySelector('.duration'); 
                    const hours = Math.floor(movieDuration / 60);
                    const minutes = movieDuration - (hours * 60) - 1;
                    movieDurationElement.textContent = `${hours}h ${minutes}m`;

                    // Changing movies genres
                    const movieGenres = movieItems[movieItemInd].querySelector('.movie_genres');
                    const genres = res.genres.slice(0,3).map(genre => genre.name);
                    const lists = Array.from(genres).map(genre => {                
                        return `<li>${genre}</li>`;
                    }).join('');
                    movieGenres.innerHTML = lists;
                })
                .catch(error => {
                    console.error(error);
                });

                // Changing age limit
                const ageLimitElement = movieItems[movieItemInd].querySelector('.age_limit');
                const ageLimit = Math.floor(Math.random() * 18);
                ageLimitElement.textContent = `${ageLimit}+`;

            });
        };
    });
};

const fetchMoviesList = (fetchURL, categoryName) => {
    const res = fetch(fetchURL);
    
    return res
     .then(res => res.json())
     .then(moviesList => {
        const movies = moviesList.results;
        if(Array.isArray(movies) && movies.length) {
            buildMoviesCategorySection(movies, categoryName);
            return movies;
        }
     })
     .catch(err => console.error(err));
}


const updateBannerSection = (movie) => {
    const movieCategoriesPromise = fetchAllCategories();
    let movieCategories = null;
    let movieCategory = null;

    movieCategoriesPromise
     .then(categories => {
        movieCategories = categories; 

        for(let index in movieCategories) {
            if(movieCategories[index].id === movie.genre_ids[0]) {
                movieCategory = movieCategories[index].name;
                break;
            }
        }
        
        const bannerSection = document.querySelector('.banner');
        bannerSection.style.backgroundImage = `url("${imgEndpoint}${movie.backdrop_path}")`;
    
        const bannerContainer = document.createElement('div');
        bannerContainer.classList.add('banner_container');
    
        bannerContainer.innerHTML = `
            <div class="netflix_tag">
                <img src="./Images/logo_small.png" alt="Netflix Logo">
                <p class="tag_category">FILM</p>
            </div>
            <h3 class="movie_name">${movie.title}</h3>
            <div class="movie_other_details">
                <p class="movie_release_year">${movie.release_date}</p>
                <p class="movie_category">${movieCategory}</p>
            </div>
            <p class="movie_description">${movie.overview}</p>
        `;
    
        bannerSection.appendChild(bannerContainer);
     })
     .catch(error => console.error("error" + error));
}

const fetchTrendingMovies = () => {
    const moviesPromise = fetchMoviesList(apiPaths.fetchTrendingMovies, "Trending on Netflix");
    
    moviesPromise
     .then(movies => {
        const randomIndex = Math.floor(Math.random() * movies.length) - 1;

        // Updating the banner section
        updateBannerSection(movies[randomIndex]);
     })
     .catch(err => console.error(err));
};

const fetchAllCategories = () => {
    const res = fetch(apiPaths.fetchAllCategories)
    
    return res
     .then(res => res.json())
     .then(res => {
        const movieCategories = res.genres;
        if(Array.isArray(movieCategories) && movieCategories.length) {
            movieCategories.slice(0,1).forEach(category => {
                if(category.name !== "Documentary") {
                    fetchMoviesList(apiPaths.fetchMoviesList(category.id), category.name);
                }
            });
            return movieCategories;
        }
     })
     .catch(err => console.error(err));
}

const bootApp = () => {
    // Fetch all the movies categories
    fetchAllCategories();

    // Fetch all the trending movies
    fetchTrendingMovies();

    // Handling Scrolling Events 
    window.addEventListener('scroll', () => {
        // Bringing background to header on scroll greater than 5.  
        const header = document.querySelector('header');

        if(window.scrollY > 5) {    
            header.classList.add('black_bg');
        }
        else {
            header.classList.remove('black_bg');
        }
    });
}

window.addEventListener('load', () => {
    // Booting the App
    bootApp();
});
