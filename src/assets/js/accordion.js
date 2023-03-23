document.querySelectorAll('.accordion__header').forEach(header => {
    const accordion = header.parentNode;
    const wrapper = header.nextElementSibling;
    let isOpened = false;

    header.addEventListener('click', () => {
        accordion.classList.toggle('open');
        isOpened = !isOpened;

        wrapper.style.maxHeight = isOpened ? `${wrapper.scrollHeight}px` : null;
    });
});