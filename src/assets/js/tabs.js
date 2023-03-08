document.addEventListener('DOMContentLoaded', function () {
  function setVisibleTab(tab, display) {
    document.querySelectorAll(`[data-tabs="${tab.dataset.tabsOpen}"]`)
      .forEach((node) => (node.style.display = display))
  }

  const isVertical = window.innerWidth <= 470

  document.querySelectorAll('.tabs').forEach((tabContainer) => {
    const tabItems = [...tabContainer.querySelectorAll('.tab')]
    const floatr = tabContainer.querySelector('.tabs__floatr')

    tabContainer.addEventListener('click', ({ target }) => {
      if (!target.classList.contains('active') && target.classList.contains('tab')) {
        tabItems.forEach((tab) => {
          tab.classList.remove('active')
          setVisibleTab(tab, 'none')
        })

        target.classList.add('active')
        setVisibleTab(target, '')

        const index = tabItems.findIndex(tab => tab.classList.contains('active'))
        const { width, height } = target.getBoundingClientRect()
        const transform = isVertical ? `translateY(${index * height}px)` : `translateX(${index * width}px)`

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
