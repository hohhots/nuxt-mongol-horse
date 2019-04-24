import Vue from 'vue'

let scrollBarHeight = 0

const _setScrollBarHeight = () => {
  if (!_isMobile()) {
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
}

const _isMobile = () => {
  const ua = navigator.userAgent
  // memoized values
  const isIphone =
    ua.toLowerCase().indexOf('iphone') !== -1 ||
    ua.toLowerCase().indexOf('ipod') !== -1
  const isIpad = ua.toLowerCase().indexOf('ipad') !== -1
  const isAndroid = ua.toLowerCase().indexOf('android') !== -1
  return isIphone || isIpad || isAndroid
}

_setScrollBarHeight()

Vue.prototype.$browserConfig = {
  setScrollBarHeight: _setScrollBarHeight,
  scrollBarHeight
}
