const util = {
  getComputedStyle(el, property) {
    const p = window.getComputedStyle(el, null).getPropertyValue(property)
    if (p.indexOf('px') > 0) {
      return parseFloat(p)
    }
    return p
  },
  // get body full Width when has content width
  getBodyWidth(contentWidth) {
    const body = document.body
    const leftBorderWidth = util.getComputedStyle(body, 'border-left-width')
    const rightBorderWidth = util.getComputedStyle(body, 'border-right-width')
    const leftPadding = util.getComputedStyle(body, 'padding-left')
    const rightPadding = util.getComputedStyle(body, 'padding-right')
    const boxSizing = util.getComputedStyle(body, 'box-sizing').toLowerCase()
    if (boxSizing === 'content-box') {
      return contentWidth
    }
    return (
      contentWidth +
      leftBorderWidth +
      leftPadding +
      rightBorderWidth +
      rightPadding
    )
  },
  // get body full Width when has content width
  getBodyFullWidth() {
    const body = document.body
    const width = util.getComputedStyle(body, 'width')
    const leftMargin = util.getComputedStyle(body, 'margin-left')
    const rightMargin = util.getComputedStyle(body, 'margin-right')
    const leftBorderWidth = util.getComputedStyle(body, 'border-left-width')
    const rightBorderWidth = util.getComputedStyle(body, 'border-right-width')
    const leftPadding = util.getComputedStyle(body, 'padding-left')
    const rightPadding = util.getComputedStyle(body, 'padding-right')
    const boxSizing = util.getComputedStyle(body, 'box-sizing').toLowerCase()

    let fullWidth = width + leftMargin + rightMargin
    if (boxSizing === 'content-box') {
      fullWidth +=
        leftBorderWidth + rightBorderWidth + leftPadding + rightPadding
    }
    return fullWidth
  },
  getHtmlWidth() {
    const contentWidth = this.getBodyFullWidth()
    const html = document.documentElement
    const leftBorderWidth = util.getComputedStyle(html, 'border-left-width')
    const rightBorderWidth = util.getComputedStyle(html, 'border-right-width')
    const leftPadding = util.getComputedStyle(html, 'padding-left')
    const rightPadding = util.getComputedStyle(html, 'padding-right')
    const boxSizing = util.getComputedStyle(html, 'box-sizing').toLowerCase()
    if (boxSizing === 'content-box') {
      return contentWidth
    }
    return (
      contentWidth +
      leftBorderWidth +
      leftPadding +
      rightBorderWidth +
      rightPadding
    )
  },
  isFirefox() {
    const ua = navigator.userAgent.toLowerCase()
    if (ua.indexOf('firefox') !== -1) {
      return true
    }
    return false
  }
}

export default util
