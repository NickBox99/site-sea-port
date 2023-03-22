document.querySelectorAll('.accordion__header').forEach(header => {
    const parent = header.parentNode;
    const wrapper = header.nextElementSibling;
    const wrapperHeight = wrapper.scrollHeight;

    header.addEventListener('click', () => {
        parent.classList.toggle('open');
        
        if (parent.classList.contains('open')) {
            wrapper.style.maxHeight = `${wrapperHeight}px`;
        } 
        else {
            wrapper.style.maxHeight = null;
        }
    });
});