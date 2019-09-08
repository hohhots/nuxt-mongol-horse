const util = {
  getComputedStyle(el, property) {
    const p = window.getComputedStyle(el, null).getPropertyValue(property)
    if (p.indexOf('px') > 0) {
      return parseFloat(p)
    }
    return p
  }
}

export default util
