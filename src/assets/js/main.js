const appHeight = () => {
  const doc = document.documentElement
  doc.style.setProperty('--app-height', `${window.innerHeight}px`)
}
window.addEventListener('resize', appHeight)
appHeight()

window.changeVisibleRouteMap = function (button) {
  let indexSelected = 1

  if (button.classList.contains('active')) {
    return
  }

  button
    .closest('.route-map__list')
    .querySelectorAll('.route-map__route')
    .forEach((route, index) => {
      if (route !== button) {
        route.classList.remove('active')
      } else {
        button.classList.add('active')
        indexSelected = index + 1
      }
    })

  const mapContainer = button.closest('.route-map')
  const activeRoutes = mapContainer.querySelectorAll(`[data-id].active`)
  const mapRoutes = mapContainer.querySelectorAll(`[data-id="${indexSelected}"]`)

  activeRoutes.forEach((route) => route.classList.remove('active'))
  mapRoutes.forEach((route) => route.classList.add('active'))
}

document.querySelectorAll('table').forEach((table) => {
  if (!table.closest('.container')) {
    return
  }

  table.removeAttribute('border')
  table.removeAttribute('cellpadding')
  table.removeAttribute('cellspacing')

  if (table.parentNode.classList.contains('table-wrapper')) {
    return
  }

  const wrapper = document.createElement('div')
  wrapper.setAttribute('class', 'table-wrapper')
  table.parentNode.insertBefore(wrapper, table)
  wrapper.appendChild(table)
})