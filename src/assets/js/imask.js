window.masks = [];

window.initMasks = (target) => {
    target.querySelectorAll('[data-mask]').forEach(element => {
        const formId = element.closest('form')?.getAttribute('id');
        const name = element.getAttribute('name');
        const key = formId ? `${formId}_${name}` : name;

        element.setAttribute('data-mask-key', key);
        
        if (!masks.find(mask => mask.name === key)) {
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