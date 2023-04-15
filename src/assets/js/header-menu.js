const iconMenuWaves = document.querySelector('.header__icon_waves'),
    iconMenuCross = document.querySelector('.header__icon_cross'),
    headerSearch = document.querySelector('.header-search'),
    headerLang = document.querySelector('#header-lang-wrapper'),
    headerProfile = document.querySelector('#header-profile-wrapper'),
    header = document.querySelector('.header'),
    linkWrapper = document.querySelector('.header-menu__link-wrapper'),
    html = document.documentElement,
    menu = new Popup('.header-menu'),
    scrollbarWidth = window.innerWidth - document.documentElement.clientWidth;

let isVisibleHeaderMenu = false;
window.toggleVisibleMenu = function () {
    menu.toggle();
    iconMenuWaves.classList.toggle('show');
    iconMenuCross.classList.toggle('show');
    header.classList.toggle('fixed');

    isVisibleHeaderMenu = !isVisibleHeaderMenu;
    html.style.paddingRight = isVisibleHeaderMenu ? `${scrollbarWidth}px` : '';
}

window.toggleVisibleSearch = function () {
    headerSearch.classList.toggle('show');
    headerSearch.classList.add('animate');
}

window.toggleVisibleLang = function () {
    headerLang.classList.toggle('show');
    headerLang.classList.add('animate');
}

document.body.addEventListener('click', ({target}) => {
    if (headerLang.classList.contains('show') && !target.closest('.header-lang')) {
        headerLang.classList.remove('show');
    }

    if (headerSearch.classList.contains('show') && !target.closest('.header-search-btn') && !target.closest('.header-search')) {
        headerSearch.classList.remove('show');
    }
})