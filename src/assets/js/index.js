document.addEventListener('DOMContentLoaded', () => {
    setTimeout(() => {
        document.querySelector('.animation-lazy')?.classList.remove('animation-lazy');
    })
})

import './scroll-nodes'
import './file'
import './validator'
import './animations'
import './accordion'
import './tabs'
import './popup'
import './header-menu'
import './pagination'
import './select'
import './dates'
import './imask'
import './map'
import './touch-scroll'
import './table'
import './odometer'
import './swiper'
import './main'

window.config = {
    host: process.env.HOST
}

window.match = null;

$('[data-zoom-image-wrapper]').magnificPopup({
    delegate: 'img',
    gallery: {
        enabled: true,
        preload: [0,2],
        navigateByImgClick: true,
        tCounter: ''
    },
    type: 'image'
});