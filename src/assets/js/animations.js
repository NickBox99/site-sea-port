if (document.querySelector('.plan-item')) {
    const defaultOdometerConfig = {
        value: 0,
        format: '( ddd)',
        theme: 'default'
    }
    
    const railCounter = new Odometer({
        el: document.querySelector('.rail-counter'),
        ...defaultOdometerConfig,
    });
    
    const shipCounter = new Odometer({
        el: document.querySelector('.ship-counter'),
        ...defaultOdometerConfig,
    })
    
    const teuCounter = new Odometer({
        el: document.querySelector('.teu-counter'),
        ...defaultOdometerConfig,
    })
    
    railCounter.update(200000);
    shipCounter.update(2000);
    teuCounter.update(757000);
    
    const aboutPageAnimation = () => {
        const aboutHeading = document.querySelector('.about__heading')
        const secondImage = document.querySelector('.containers-image')
    
        const imageSecondAnimationObserver = new IntersectionObserver(([entry]) => {
            if (entry.isIntersecting) {
                secondImage.classList.add('animate-show-left')
            }
        })
    
        const headingAnimationObserver = new IntersectionObserver(([entry]) => {
            if (entry.isIntersecting) {
                aboutHeading.classList.remove('animation-off')
            }
        }, {
            threshold: 0.8
        })
    
        if (secondImage) {
            imageSecondAnimationObserver.observe(secondImage)
        }
    
        if (aboutHeading) {
            headingAnimationObserver.observe(aboutHeading)
        }
    }
    
    aboutPageAnimation();
}
document.querySelectorAll('.animate-text-top').forEach((el) => {
    const content = el.innerHTML;

    el.classList.remove('animate-text-top');
    el.classList.add('animate-text-vertical');
    el.innerHTML = `
      <span style="color: transparent !important;" class="animate-text-vertical__container">
        ${content}
      </span>
      <span class="animate-text-vertical__wrapper">
        <span class="animate-text-vertical__content">
          ${content}
        </span>
      </span>
    `
});

window.SVGAnimate = (mapId) => {
    const map = document.getElementById(mapId);
    const routes = map.querySelectorAll('.svg-animate__path');

    routes.forEach((path) => {
        const pathMask = path.cloneNode();
        const pathLength = path.getTotalLength();

        path.style.cssText = `
          stroke-dasharray: ${pathLength};
          stroke-dashoffset: ${pathLength};
        `

        pathMask.setAttribute('class', 'svg-animate__mask');
        map.insertBefore(pathMask, path.nextSibling);
    })
}