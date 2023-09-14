import { apiKey } from './movie_details.js';
import { youtubeApiKey } from './movie_details.js';
import { apiEndpoint } from './movie_details.js';
import { apiPaths } from './movie_details.js';
import { movieId } from './movie_details.js';

let youtubeTrailerId = null;


// Function for searching yt trailer id for generating id.
const searchYoutubeTrailerId = (movieTitle) => {
    const res = fetch(apiPaths.searchYoutubeTrailerId(movieTitle));

    res
     .then(res => res.json())
     .then(movieData => {
        youtubeTrailerId = movieData.items[0].id.videoId;
        console.log(youtubeTrailerId);
     })
     .catch(error => console.error("Error : " + error));
}

// Function for fetching movie details 
const fetchMovieDetails = (movieId) => {
    const res = fetch(apiPaths.searchMovieById(movieId));
    
    res
     .then(res => res.json())
     .then(movie => {
        searchYoutubeTrailerId(movie.title);
     })
     .catch(error => console.error("Error : " + error));
}

const bootApp = async () => {
    // fetchMovieDetails(movieId);

    
}

window.addEventListener('load', (event) => {
    bootApp();

    // 2. This code loads the IFrame Player API code asynchronously.
var tag = document.createElement('script');

tag.src = "https://www.youtube.com/iframe_api";
var firstScriptTag = document.getElementsByTagName('script')[0];
firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);

// 3. This function creates an <iframe> (and YouTube player)
//    after the API code downloads.
var player;
function onYouTubeIframeAPIReady() {
  player = new YT.Player('player', {
    height: '390',
    width: '640',
    videoId: 'M7lc1UVf-VE',
    playerVars: {
      'playsinline': 1
    },
    events: {
      'onReady': onPlayerReady,
      'onStateChange': onPlayerStateChange
    }
  });
}

// 4. The API will call this function when the video player is ready.
function onPlayerReady(event) {
  event.target.playVideo();
}

// 5. The API calls this function when the player's state changes.
//    The function indicates that when playing a video (state=1),
//    the player should play for six seconds and then stop.
var done = false;
function onPlayerStateChange(event) {
  if (event.data == YT.PlayerState.PLAYING && !done) {
    setTimeout(stopVideo, 6000);
    done = true;
  }
}
function stopVideo() {
  player.stopVideo();
}
})



