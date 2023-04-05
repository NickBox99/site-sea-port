function setVisibleTabContent(tab, display) {
    document.querySelectorAll(`[data-tabs="${tab.dataset.tabsOpen}"]`)
        .forEach((node) => (node.style.display = display));
    
    const tabs = document.querySelectorAll(`[data-tabs-open="${tab.dataset.tabsOpen}"]`);
    
    if (display) {
        tabs.forEach(tab => tab.classList.remove('active'));
    }
    else {
        tabs.forEach(tab => tab.classList.add('active'));
    }
}

window.setVisibleTab = (selector, tab) => {
    const activeTap = selector.querySelectorAll('.active');

    if (activeTap.length) {
        setVisibleTabContent(activeTap[0], 'none');
    }

    tab.classList.add('active');
    setVisibleTabContent(tab, '');
}

window.initInlineTabs = (selector) => {
    if (selector) {
        selector.addEventListener('click', ({target}) => {
            if (!target.classList.contains('active') && target.hasAttribute('data-tabs-open')) {
                setVisibleTab(selector, target);
            }
        });
    }
}

document.addEventListener('DOMContentLoaded', function () {
    let isVertical = window.innerWidth <= 470;
    
    document.querySelectorAll('.tabs').forEach((tabContainer) => {
        const tabItems = [...tabContainer.querySelectorAll('.tab')];
        const floatr = tabContainer.querySelector('.tabs__floatr');
        
        function setPositionFloatr() {
            const index = tabItems.findIndex(tab => tab.classList.contains('active'));
            const { width, height } = tabItems[0].getBoundingClientRect();
            const transform = isVertical ? `translateY(${index * height}px)` : `translateX(${index * width}px)`;

            floatr.style.cssText = `
                  width: ${width}px;
                  transform: ${transform};
                  -webkit-transform: ${transform};
                  -moz-transform: ${transform};
                `;
        }

        tabContainer.addEventListener('click', ({target}) => {
            if (!target.classList.contains('active') && target.classList.contains('tab')) {
                setVisibleTab(tabContainer, target);
                setPositionFloatr();
            }
        })

        window.addEventListener('resize', () => {
            floatr.classList.add('tabs__floatr_transition-disable');
            isVertical = window.innerWidth <= 470;
            setPositionFloatr();
            floatr.classList.remove('tabs__floatr_transition-disable');
        });
    })
})