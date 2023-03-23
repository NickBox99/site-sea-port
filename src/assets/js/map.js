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

    svgPanZoom(`#${mapId}`, {
        zoomEnabled: true,
        fit: true,
        center: true
    })
}

window.initMapAnimateButtons = (mapSelector, wrapperButtonsSelector) => {
    const map = document.querySelector(mapSelector);
    const wrapperButtons = document.querySelector(wrapperButtonsSelector);
    
    if (!map || !wrapperButtons) {
        return;
    }
    
    wrapperButtons.addEventListener('click', ({ target }) => {
        const routeId = target.getAttribute('data-route-id');
        
        if (!routeId || target.classList.contains('active')) {
            return;
        }
        
        const setActiveRoute = (wrapper, targets) => {
            wrapper.querySelectorAll('.active').forEach(el => el.classList.remove('active'));
            targets.forEach(el => el.classList.add('active'));
        }

        setActiveRoute(wrapperButtons, [target]);
        setActiveRoute(map, map.querySelectorAll(`[data-id="${routeId}"]`));
    })
}