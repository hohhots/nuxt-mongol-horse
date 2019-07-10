import util from '@/util/util.js'

export default {
  data() {
    return {
      scrollBarHeight: 0,
      htmlContentHeight: 0,
      bodyContentHeight: 0
    }
  },
  methods: {
    setScrollBarHeight() {
      // If is mobile, does nothing
      if (!this.scrollBarHeight) {
        return
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
      this.scrollBarHeight = scrollDiv.offsetHeight - scrollDiv.clientHeight

      // Delete the DIV
      document.body.removeChild(scrollDiv)
    },

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
      this.setScrollBarHeight()
      this.setHtmlContentHeight(windowContentHeight)
      this.setBodyContentHeight()
    }
  }
}
