window.initMapAnimate = (mapId, pathMaskColor = '#025493', isCreateMask = true) => {
    const map = document.getElementById(mapId);

    if (!map) return;

    const routes = map.querySelectorAll('.svg-animate__path');
    const wrapper = map.parentNode.parentNode;

    routes.forEach((path) => {
        const pathMask = path.cloneNode();
        const pathLength = path.getTotalLength();

        if (isCreateMask) {
          path.style.cssText = `
            stroke-dasharray: ${pathLength};
            stroke-dashoffset: ${pathLength};
          `;
        }

        pathMask.style.cssText = `stroke: ${pathMaskColor};`;

        pathMask.setAttribute('class', 'svg-animate__mask');
        isCreateMask && map.insertBefore(pathMask, path.nextSibling);
    })
    
    const panZoom = svgPanZoom(`#${mapId}`, {
        zoomEnabled: false,
        fit: true,
        center: true
    });
    
    if (window.innerWidth >= 1024) {
        panZoom.zoomIn();
        panZoom.zoomIn();
    }

    wrapper.querySelector('.route-map__zoom_in')?.addEventListener('click', () => panZoom.zoomIn());
    wrapper.querySelector('.route-map__zoom_out')?.addEventListener('click', () => panZoom.zoomOut());
}

window.initMapAnimateButtons = (mapSelector, wrapperSelectors) => {
    const map = document.querySelector(mapSelector);
    
    if (!map) {
        return;
    }

    const wrapperButtons = wrapperSelectors.map(selector => document.querySelector(selector)).map(el => el);

    if (!wrapperButtons.length) {
        return;
    }
    
    const containers = [map, ...wrapperButtons];

    wrapperButtons.forEach(wrapper => wrapper.addEventListener('click', ({ target }) => {
        const routeId = target.getAttribute('data-route-id');

        if (!routeId) {
            return;
        }

        containers.forEach(wrapper => wrapper.querySelectorAll('.active').forEach(el => el.classList.remove('active')));
        
        [
            ...map.querySelectorAll(`[data-id="${routeId}"]`), 
            ...wrapperButtons.reduce((arr, wrapper) => arr.concat(...wrapper.querySelectorAll(`[data-route-id="${routeId}"]`)), [])
        ].forEach(el => el.classList.add('active'));
    }))
}