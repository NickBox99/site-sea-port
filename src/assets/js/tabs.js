document.addEventListener('DOMContentLoaded', function () {
  function setVisibleTab(tab, display) {
    const nodes = document.querySelectorAll(
      `[data-tabs="${tab.getAttribute('data-tabs-open')}"]`
    )

    if (nodes && nodes.length) {
      nodes.forEach((node) => (node.style.display = display))
    }
  }

  document.querySelectorAll('.tabs').forEach((tabs) => {
    const tabsItems = tabs.querySelectorAll('.tab')

    tabs.addEventListener('click', ({ target }) => {
      if (
        !target.classList.contains('active') &&
        target.classList.contains('tab')
      ) {
        tabsItems.forEach((tab) => {
          tab.classList.remove('active')

          setVisibleTab(tab, 'none')
        })

        target.classList.add('active')
        setVisibleTab(target, '')
      }
    })
  })

  document.querySelectorAll('.tabs-animate')?.forEach((tabContainer) => {
    const floatrLabel = tabContainer.querySelector('.tabs-animate__floatr')
    const tabActive = tabContainer.querySelector('.active')
    const tabContainerLeftPosition =tabContainer.getBoundingClientRect().left
    const activeTabLeft = tabActive.getBoundingClientRect().left - tabContainerLeftPosition
    const activeTabWidth = tabActive.getBoundingClientRect().width

    floatrLabel.style.cssText = `
      left: ${activeTabLeft}px;
      width: ${activeTabWidth}px;
    `

    tabContainer.querySelectorAll('.tab').forEach((tab) => {
      tab.addEventListener('click', () => {
        const left = tab.getBoundingClientRect().left - (tabContainerLeftPosition + 6)
        const width = tab.getBoundingClientRect().width
        const sictranslate = `translate(${left}px, 0px)`

        floatrLabel.style.cssText = `
          width: ${width}px;
          -webkit-transform: ${sictranslate};
          -moz-transform: ${sictranslate};
        `

        console.log(left, width);
      })
    })
  })
})
