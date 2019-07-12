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
    }
  }
}
