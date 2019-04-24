import Vue from 'vue'

let scrollBarHeight = 0

const _setScrollBarHeight = () => {
  if (Vue.prototype.$browserConfig) {
    // If is mobile, does nothing
    if (!Vue.prototype.$browserConfig.scrollBarHeight) {
      return
    }
  }
  // If is not mobile and window zoomed,
  // need to calculate scrollbar height again

  // Create the measurement node
  const scrollDiv = document.createElement('div')

  scrollDiv.style.width = '100px'
  scrollDiv.style.height = '100px'
  scrollDiv.style.overflow = 'scroll'
  scrollDiv.style.position = 'absolute'
  scrollDiv.style.top = '-9999px'
  document.body.appendChild(scrollDiv)

  // Get the scrollbar height
  scrollBarHeight = scrollDiv.offsetHeight - scrollDiv.clientHeight

  // Delete the DIV
  document.body.removeChild(scrollDiv)

  if (Vue.prototype.$browserConfig) {
    Vue.prototype.$browserConfig.scrollBarHeight = scrollBarHeight
  }
}

_setScrollBarHeight()

Vue.prototype.$browserConfig = {
  setScrollBarHeight: _setScrollBarHeight,
  scrollBarHeight
}
