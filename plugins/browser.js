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
  const htmlTopMargin = util.getComputedStyle(html, 'margin-top')
  const htmlBottomMargin = util.getComputedStyle(html, 'margin-bottom')

  console.log('html top margin - ' + htmlTopMargin)
  console.log('html bottom margin - ' + htmlBottomMargin)

  html.style.height = '100%'
  let htmlHeight = util.getComputedStyle(html, 'height')

  console.log('html height - ' + util.getComputedStyle(html, 'height'))

  htmlHeight -= htmlTopMargin
  if (util.hasBottomMargin()) {
    htmlHeight -= htmlBottomMargin
  }

  console.log('html height minus margin - ' + htmlHeight)

  if (Vue.prototype.$browserConfig) {
    Vue.prototype.$browserConfig.htmlContentHeight = htmlHeight
  }

  _htmlContentHeight = htmlHeight
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
