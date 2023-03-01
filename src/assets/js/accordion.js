document.addEventListener("DOMContentLoaded", function() {
    document.querySelector('.accordion-wrapper')?.addEventListener('click', ({ target }) => {
        
        const header = target.closest('.accordion__header');
        
        if (header) {
            const accordion = header.closest('.accordion');
            
            if (accordion) {
                accordion.classList.toggle('open');
            }
        }
    });
});