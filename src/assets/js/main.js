const appHeight = () => {
    const doc = document.documentElement;
    doc.style.setProperty('--app-height', `${window.innerHeight}px`);
}
window.addEventListener('resize', appHeight);
appHeight();

window.changeVisibleRouteMap = function (btn) {
    if(btn.classList.contains('active')) {
        return;
    }
    
    let idxSelected = -1;
    btn.closest('.route-map__list').querySelectorAll('.route-map__route').forEach((el, idx) => {
        if(el !== btn) {
            el.classList.remove('active');
        }
        else {
            btn.classList.add('active');
            idxSelected = idx;
        }
    });

    const maps = btn.closest('.route-map').querySelectorAll('.route-map__path');
    
    if (idxSelected < 0 && maps[idxSelected]) {
        return;
    }
    
    maps.forEach(map => {
        map.classList.add('hide');
    });
    maps[idxSelected].classList.remove('hide');
}

document.querySelectorAll('table').forEach(table => {
    if (!table.closest('.container')) {
        return;
    }
    
    table.removeAttribute('border');
    table.removeAttribute('cellpadding');
    table.removeAttribute('cellspacing');

    if (table.parentNode.classList.contains('table-wrapper')) {
        return;
    }
    
    const wrapper = document.createElement('div');
    wrapper.setAttribute('class', 'table-wrapper');
    table.parentNode.insertBefore(wrapper, table);
    wrapper.appendChild(table);
})