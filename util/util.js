const util = {
  getComputedStyle(el, property) {
    const p = window.getComputedStyle(el, null).getPropertyValue(property)
    if (p.indexOf('px') > 0) {
      return parseFloat(p)
    }
    return p
  },
  fileExistsInServer(fileUrl) {
    const http = new XMLHttpRequest()

    http.open('HEAD', fileUrl, false)
    http.send()

    return http.status !== 404
  }
}

export default util
