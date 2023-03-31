window.masks = [];

window.initMasks = (target) => {
    target.querySelectorAll('[data-mask]').forEach(element => {
        const name = element.getAttribute('name') || '';
        
        if (!masks.find(mask => mask.name === name)) {
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