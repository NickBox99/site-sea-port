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

document.querySelectorAll('.animate-text-top_scroll').forEach(el => {
    new IntersectionObserver((entries) => {
        entries.forEach(({isIntersecting}) => {
            if (isIntersecting) {
                el.classList.remove('animate-text-top_scroll');
            }
        })
    }, {
        threshold: 0.5
    }).observe(el.nextElementSibling);
})

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