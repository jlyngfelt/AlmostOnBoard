const searchIcon = document.querySelector('.searchIcon');
const settings = document.querySelector('.settings');
const display = document.querySelector('.display');

if (searchIcon) {
    searchIcon.addEventListener('click', () => {
        settings.classList.toggle('openSettings');
        display.classList.toggle('closeDisplay');
        searchIcon.src = searchIcon.src.includes('/img/search.png') ? '/img/arrow.png' : '/img/search.png';
    });
}