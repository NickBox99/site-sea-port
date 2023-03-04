document.addEventListener("DOMContentLoaded", function() {
    document.querySelectorAll('[data-mask]')?.forEach(element => IMask(element, {
        mask: element.getAttribute('data-mask')
    }));
});