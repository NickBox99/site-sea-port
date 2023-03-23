document.querySelectorAll('table').forEach((table) => {
    if (!table.closest('.container')) {
        return;
    }

    table.removeAttribute('border');
    table.removeAttribute('cellpadding');
    table.removeAttribute('cellspacing');

    const parent = table.parentNode;
    if (parent.classList.contains('table-wrapper')) {
        return;
    }

    const wrapper = document.createElement('div');
    wrapper.setAttribute('class', 'table-wrapper');
    parent.insertBefore(wrapper, table);
    wrapper.appendChild(table);
})

document.addEventListener('DOMContentLoaded', () => {
    document.querySelectorAll('.table-wrapper').forEach((wrapper, idx) => {
        const id = `table-wrapper-${idx}`;
        wrapper.id = id;

        const touchScroll = new TouchScroll();
        touchScroll.init({
            id,
            draggable: true,
            wait: false
        });
    })
})