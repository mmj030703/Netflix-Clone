window.addEventListener('scroll', () => {
    const header = document.querySelector('header');

    if(window.scrollY > 5) {
        header.classList.add('black_bg');
    }
    else {
        header.classList.remove('black_bg');
    }
});