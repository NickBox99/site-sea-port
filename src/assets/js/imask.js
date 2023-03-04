document.addEventListener("DOMContentLoaded", function() {
    window.initMasks = (target) => {
        target.querySelectorAll('[data-mask]')?.forEach(element => IMask(element, {
            mask: element.getAttribute('data-mask')
        }));
    }

    initMasks(document);
});