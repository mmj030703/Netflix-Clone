// Attach event listeners after DOM content is loaded
document.addEventListener('DOMContentLoaded', () => {
    //& Code Starts Here
    const movieCategorySection = document.querySelector('.movie_categories_section');

    // Attach event listeners to dynamically generated icons using event delegation
    movieCategorySection.addEventListener('click', (event) => {
        //& Functions Definition Start Here
        const showAndHideIcons = () => {
            const prev = parent.querySelector('#prev');
            const next = parent.querySelector('#next');

            prev.style.display = movieCarousel.scrollLeft === 0 ? 'none' : 'block';
            next.style.display = movieCarousel.scrollLeft === maxScrollingWidth ? 'none' : 'block';
        }

        // Carousels of Movies List
        const movieCarousels = movieCategorySection.querySelectorAll('.movies_list');

        // Prev or Next icon 
        const icon = event.target;

        // If prev icon clicked then
        if (icon.matches('#prev')) {
            const parent = icon.parentElement;
            const movieCarousel = parent.querySelector('.movies_list');
            const firstImg = movieCarousel.querySelector('.movie_item');
            const firstImgWidth = firstImg.clientWidth;

            // Scrolling width is width of four movie_item + column gap of four movie_item 
            const scrollingWidth = (firstImgWidth * 4) + (16 * 4);

            // Maximum scrolling widh of carousel i.e scrollable width of carousel - visible width of carousel
            const maxScrollingWidth = movieCarousel.scrollWidth - movieCarousel.clientWidth;

            // When the carousel reached end during scrolling to left side after that when prev icon is clicked then we will not scroll scrolling width
            if (movieCarousel.scrollLeft === maxScrollingWidth) {
                // Calculating half width of first image
                const removeVal = (movieCarousel.clientWidth - scrollingWidth) + 10;
                // Amount of half of the width of first image to be removed from scrolling width
                movieCarousel.scrollLeft -= (scrollingWidth - removeVal);
            }
            // Scrolling in normal conditions
            else {

                // Subtracting scrolling width from scrollleft of movie carousel to scroll to right 
                movieCarousel.scrollLeft -= scrollingWidth;
            }

            showAndHideIcons();
        }
        // If next icon clicked then
        else if (icon.matches('#next')) {
            const parent = icon.parentElement;
            const movieCarousel = parent.querySelector('.movies_list');
            const firstImg = movieCarousel.querySelector('.movie_item');
            const firstImgWidth = firstImg.clientWidth;

            const scrollingWidth = (firstImgWidth * 4) + (16 * 4);

            // Maximum scrolling widh of carousel i.e scrollable width of carousel - visible width of carousel
            const maxScrollingWidth = movieCarousel.scrollWidth - movieCarousel.clientWidth;

            // Adding scrolling width from scrollleft of movie carousel to scroll to left 
            movieCarousel.scrollLeft += scrollingWidth;

            showAndHideIcons();
        }
    });
});