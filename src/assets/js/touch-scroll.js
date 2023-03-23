window.touchScrollInit = function (selector, prefix) {
    document.querySelectorAll(selector).forEach((el, idx) => {
        const id = `${prefix}-${idx}`;
        el.id = id;

        const viewer = new TouchScroll();
        viewer.init({
            id,
            draggable: true,
            wait: false
        });
    })
}