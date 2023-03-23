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

window.changeVisibleRouteMap = function (button) {
    let indexSelected = 1;

    if (button.classList.contains('active')) {
        return;
    }

    button
        .closest('.route-map__list')
        .querySelectorAll('.route-map__route')
        .forEach((route, index) => {
            if (route !== button) {
                route.classList.remove('active');
            } else {
                button.classList.add('active');
                indexSelected = index + 1;
            }
        })

    const mapContainer = button.closest('.route-map');
    const activeRoutes = mapContainer.querySelectorAll(`[data-id].active`);
    const mapRoutes = mapContainer.querySelectorAll(`[data-id="${indexSelected}"]`);

    activeRoutes.forEach((route) => route.classList.remove('active'));
    mapRoutes.forEach((route) => route.classList.add('active'));
}