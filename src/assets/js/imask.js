window.masks = [];

window.initMasks = (target) => {
    target.querySelectorAll('[data-mask]').forEach(element => {
        if (!masks.find(mask => mask === element)) {
            IMask(element, {
                mask: element.getAttribute('data-mask')
            });

            masks.push(element);
        }
    });
}

document.addEventListener("DOMContentLoaded", function() {
    initMasks(document);
});