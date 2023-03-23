document.querySelectorAll('.animate-text-top').forEach((el) => {
    const content = el.innerHTML;

    el.classList.remove('animate-text-top');
    el.classList.add('animate-text-vertical');
    el.innerHTML = `
      <span class="animate-text-vertical__container">
        ${content}
      </span>
      <span class="animate-text-vertical__wrapper">
        <span class="animate-text-vertical__content">
          ${content}
        </span>
      </span>
    `;
});

const animateTextOnScroll = (el) => {
    const observerCallback = ([{ isIntersecting }]) => {
        if (isIntersecting) {
            el.classList.remove('animate-text-on-scroll');
            observer.unobserve(el.nextElementSibling);
        }
    };

    const observer = new IntersectionObserver(observerCallback, {
        threshold: 0.5,
        rootMargin: '0px'
    });

    const nextEl = el.nextElementSibling;

    if (nextEl) {
        observer.observe(nextEl);
    }
};

document.querySelectorAll('.animate-text-on-scroll').forEach(animateTextOnScroll);

window.mapAnimate = (mapId, pathMaskColor = '#025493') => {
    const map = document.getElementById(mapId);
    
    if (!map) return;
    
    const routes = map.querySelectorAll('.svg-animate__path');

    routes.forEach((path) => {
        const pathMask = path.cloneNode();
        const pathLength = path.getTotalLength();

        path.style.cssText = `
          stroke-dasharray: ${pathLength};
          stroke-dashoffset: ${pathLength};
        `;

        pathMask.style.cssText = `stroke: ${pathMaskColor};`;

        pathMask.setAttribute('class', 'svg-animate__mask');
        map.insertBefore(pathMask, path.nextSibling);
    })
}