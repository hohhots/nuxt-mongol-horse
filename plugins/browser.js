import Vue from 'vue'

import util from '@/util/util.js'

let _scrollBarHeight = 0
let _htmlContentHeight = 0

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
  _scrollBarHeight = scrollDiv.offsetHeight - scrollDiv.clientHeight

  // Delete the DIV
  document.body.removeChild(scrollDiv)

  if (Vue.prototype.$browserConfig) {
    Vue.prototype.$browserConfig.scrollBarHeight = _scrollBarHeight
  }
}

const _setHtmlContentHeight = () => {
  const html = document.documentElement
  const topMargin = util.getComputedStyle(html, 'margin-top')
  const bottomMargin = util.getComputedStyle(html, 'margin-bottom')
  const topBorderWidth = util.getComputedStyle(html, 'border-top-width')
  const bottomBorderWidth = util.getComputedStyle(html, 'border-bottom-width')
  const topPadding = util.getComputedStyle(html, 'padding-top')
  const bottomPadding = util.getComputedStyle(html, 'padding-bottom')
  const boxSizing = util.getComputedStyle(html, 'box-sizing').toLowerCase()

  html.style.height = '100%'
  let htmlContentHeight = util.getComputedStyle(html, 'height')

  htmlContentHeight -= topMargin + bottomMargin

  if (boxSizing === 'content-box') {
    htmlContentHeight -=
      topPadding + bottomPadding + topBorderWidth + bottomBorderWidth
  }

  if (Vue.prototype.$browserConfig) {
    Vue.prototype.$browserConfig.htmlContentHeight = htmlContentHeight
  }

  _htmlContentHeight = htmlContentHeight
}

const _setBrowserState = () => {
  _setScrollBarHeight()
  _setHtmlContentHeight()
}

_setBrowserState()

Vue.prototype.$browserConfig = {
  setBrowserState: _setBrowserState,
  scrollBarHeight: _scrollBarHeight,
  htmlContentHeight: _htmlContentHeight
}
