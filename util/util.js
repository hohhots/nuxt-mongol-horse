const util = {
  getComputedStyle(el, property) {
    const p = window.getComputedStyle(el, null).getPropertyValue(property)
    if (p.indexOf('px') > 0) {
      return parseFloat(p)
    }
    return p
  },
  // firefox doesn't has bottom margin
  // when html height with margin is taller than vh
  hasBottomMargin() {
    const ua = navigator.userAgent.toLowerCase()
    if (ua.indexOf('firefox') === -1) {
      return true
    }
    return false
  }
}

export default util
