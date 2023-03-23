window.initMapAnimate = (mapId, pathMaskColor = '#025493') => {
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

window.initMapAnimateButtons = (map, wrapperButtons) => {
    if (!map || !wrapperButtons) {
        return;
    }
    
    wrapperButtons.addEventListener('click', ({ target }) => {
        const routeId = target.getAttribute('data-route-id');
        
        if (!routeId || target.classList.contains('active')) {
            return;
        }
        
        const setActiveRoute = () => {
            wrapperButtons.querySelector('.active')?.classList.remove('active');
            target.classList.add('active');
        }

        setActiveRoute(wrapperButtons, target);
        setActiveRoute(map, map.querySelector(`[data-id="${routeId}"]`));
    })
}