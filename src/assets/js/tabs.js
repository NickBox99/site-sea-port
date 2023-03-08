function setVisibleTabContent(tab, display) {
  document.querySelectorAll(`[data-tabs="${tab.dataset.tabsOpen}"]`)
      .forEach((node) => (node.style.display = display));
}

window.setVisibleTab = (selector, tab) => {
  const activeTap = selector.querySelector('.active');

  if (activeTap) {
    activeTap.classList.remove('active');
    setVisibleTabContent(activeTap, 'none');
  }

  tab.classList.add('active');
  setVisibleTabContent(tab, '');
}

window.initTabs = (selector) => {
  selector.addEventListener('click', ({ target }) => {
    if (!target.classList.contains('active') && target.hasAttribute('data-tabs-open')) {
      setVisibleTab(selector, target);
    }
  });
}

document.addEventListener('DOMContentLoaded', function () {
  const isVertical = window.innerWidth <= 470;

  document.querySelectorAll('.tabs').forEach((tabContainer) => {
    const tabItems = [...tabContainer.querySelectorAll('.tab')];
    const floatr = tabContainer.querySelector('.tabs__floatr');

    tabContainer.addEventListener('click', ({ target }) => {
      if (!target.classList.contains('active') && target.classList.contains('tab')) {
        setVisibleTab(tabContainer, target);

        const index = tabItems.findIndex(tab => tab.classList.contains('active'));
        const { width, height } = target.getBoundingClientRect();
        const transform = isVertical ? `translateY(${index * height}px)` : `translateX(${index * width}px)`;

        floatr.style.cssText = `
          width: ${width}px;
          transform: ${transform};
          -webkit-transform: ${transform};
          -moz-transform: ${transform};
        `
      }
    })
  })
  
})

//data-tabs-open="paperwork"   data-tabs="map"