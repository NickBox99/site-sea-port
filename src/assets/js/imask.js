window.masks = [];

window.initMasks = (target) => {
    target.querySelectorAll('[data-mask]').forEach(element => {
        const name = element.getAttribute('name') || '';
        
        if (!masks.find(mask => mask.name === name)) {
            const mask = element.getAttribute('data-mask');
            
            const iMask = IMask(element, {
                mask: mask === 'number'? /\d+/ : mask
            });

            masks.push({
                name,
                iMask
            });
        }
    });
}

document.addEventListener("DOMContentLoaded", function() {
    initMasks(document);
});