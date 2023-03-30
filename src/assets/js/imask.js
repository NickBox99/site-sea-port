window.masks = [];

window.initMasks = (target) => {
    target.querySelectorAll('[data-mask]').forEach(element => {
        if (!masks.find(mask => mask === element)) {
            const mask = element.getAttribute('data-mask');
            
            IMask(element, {
                mask: mask === 'number'? Number : mask
            });

            masks.push(element);
        }
    });
}

document.addEventListener("DOMContentLoaded", function() {
    initMasks(document);
});