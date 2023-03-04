import './libs'
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
import './main'

window.config = {
    host: process.env.HOST
}

window.match = null

const map = document.querySelector('.about__map-bg');

if (map) {
    gsap.to(map, {
        scrollTrigger: {
            trigger: map,
            start: 'center',
            end: () => {
                if (innerWidth > 1065) {
                    return '+=800'
                } else if (innerWidth <= 1065 && innerWidth > 970) {
                    return '+=700'
                } else if (innerWidth <= 970 && innerWidth >= 901) {
                    return '+=600'
                } else if (innerWidth < 901 && innerWidth >= 736) {
                    return '+=1250'
                } else if (innerWidth < 736 && innerWidth >= 641) {
                    return '+=1050'
                } else if (innerWidth < 641 && innerWidth >= 491) {
                    return '+=900'
                } else if (innerWidth < 491 && innerWidth >= 406) {
                    return '+=800'
                } else if (innerWidth < 406) {
                    return '+=700'
                }
            },
            scrub: true,
            onToggle: (self) => {
                map.classList.toggle('ready', self.progress === 1)
            },
        },
        y: () => {
            if (innerWidth > 1400) {
                return 1330
            } else if (innerWidth <= 1400 && innerWidth > 1100) {
                return 1325
            } else if (innerWidth <= 1100 && innerWidth > 1024) {
                return 1265
            } else if (innerWidth <= 1024 && innerWidth > 1022) {
                return 1240
            } else if (innerWidth <= 1022 && innerWidth > 900) {
                return 1155
            } else if (innerWidth <= 900 && innerWidth > 846) {
                return 1850
            } else if (innerWidth <= 846 && innerWidth > 810) {
                return 1770
            } else if (innerWidth <= 810 && innerWidth > 790) {
                return 1700
            } else if (innerWidth <= 790 && innerWidth > 730) {
                return 1615
            } else if (innerWidth <= 730 && innerWidth > 640) {
                return 1515
            } else if (innerWidth <= 640 && innerWidth > 630) {
                return 1385
            } else if (innerWidth <= 630 && innerWidth > 600) {
                return 1325
            } else if (innerWidth <= 600 && innerWidth > 560) {
                return 1400
            } else if (innerWidth <= 560 && innerWidth > 524) {
                return 1310
            } else if (innerWidth <= 524 && innerWidth > 486) {
                return 1260
            } else if (innerWidth <= 486 && innerWidth > 480) {
                return 1204
            } else if (innerWidth <= 480 && innerWidth > 390) {
                return 1168
            } else if (innerWidth <= 390 && innerWidth > 320) {
                return 1250
            } else if (innerWidth <= 320) {
                return 1315
            }
        },
        scale: () => {
            if (innerWidth > 1100) {
                return 0.4
            } else if (innerWidth <= 1100 && innerWidth > 910) {
                return 0.32
            } else if (innerWidth <= 910 && innerWidth > 810) {
                return 0.26
            } else if (innerWidth <= 810 && innerWidth > 560) {
                return 0.21
            } else if (innerWidth <= 560 && innerWidth > 496) {
                return 0.17
            } else if (innerWidth <= 496 && innerWidth > 440) {
                return 0.15
            } else if (innerWidth <= 440 && innerWidth > 390) {
                return 0.13
            } else if (innerWidth <= 390 && innerWidth > 320) {
                return 0.12
            } else if (innerWidth <= 320) {
                return 0.185
            }
        },
        x: '-50%',
    })
}
