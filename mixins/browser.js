import util from '@/util/util.js'

export default {
  data() {
    return {
      htmlContentHeight: 0,
      bodyContentHeight: 0
    }
  },
  methods: {
    setHtmlContentHeight(windowContentHeight) {
      const html = document.documentElement
      const topMargin = util.getComputedStyle(html, 'margin-top')
      const bottomMargin = util.getComputedStyle(html, 'margin-bottom')
      const topBorderWidth = util.getComputedStyle(html, 'border-top-width')
      const bottomBorderWidth = util.getComputedStyle(
        html,
        'border-bottom-width'
      )
      const topPadding = util.getComputedStyle(html, 'padding-top')
      const bottomPadding = util.getComputedStyle(html, 'padding-bottom')

      let htmlContentHeight = windowContentHeight - (topMargin + bottomMargin)

      htmlContentHeight -=
        topBorderWidth + bottomBorderWidth + topPadding + bottomPadding

      this.htmlContentHeight = htmlContentHeight
    },

    setBodyContentHeight() {
      const body = document.body
      const topMargin = util.getComputedStyle(body, 'margin-top')
      const bottomMargin = util.getComputedStyle(body, 'margin-bottom')
      const topBorderWidth = util.getComputedStyle(body, 'border-top-width')
      const bottomBorderWidth = util.getComputedStyle(
        body,
        'border-bottom-width'
      )
      const topPadding = util.getComputedStyle(body, 'padding-top')
      const bottomPadding = util.getComputedStyle(body, 'padding-bottom')

      let bodyContentHeight = this.htmlContentHeight

      bodyContentHeight -= topMargin + bottomMargin

      bodyContentHeight -=
        topBorderWidth + bottomBorderWidth + topPadding + bottomPadding

      this.bodyContentHeight = bodyContentHeight
    },

    setBrowserState(windowContentHeight) {
      this.setHtmlContentHeight(windowContentHeight)
      this.setBodyContentHeight()
    },

    // get body full Width when has content width
    getBodyWidth(contentWidth) {
      const body = document.body
      const boxSizing = util.getComputedStyle(body, 'box-sizing').toLowerCase()

      if (boxSizing === 'content-box') {
        return contentWidth
      }

      const leftBorderWidth = util.getComputedStyle(body, 'border-left-width')
      const rightBorderWidth = util.getComputedStyle(body, 'border-right-width')
      const leftPadding = util.getComputedStyle(body, 'padding-left')
      const rightPadding = util.getComputedStyle(body, 'padding-right')

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
      const boxSizing = util.getComputedStyle(html, 'box-sizing').toLowerCase()

      if (boxSizing === 'content-box') {
        return contentWidth
      }

      const leftBorderWidth = util.getComputedStyle(html, 'border-left-width')
      const rightBorderWidth = util.getComputedStyle(html, 'border-right-width')
      const leftPadding = util.getComputedStyle(html, 'padding-left')
      const rightPadding = util.getComputedStyle(html, 'padding-right')

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
}
