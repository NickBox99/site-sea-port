document.addEventListener("DOMContentLoaded", function() {
    document.querySelectorAll('.accordion-wrapper').forEach(accordion => {
        accordion.addEventListener('click', ({ target }) => {

            const header = target.closest('.accordion__header');

            if (header) {
                const accordion = header.closest('.accordion');

                if (accordion) {
                    accordion.classList.toggle('open');
                }
            }
        });
    })
});