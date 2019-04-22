import Vue from 'vue'

let scrollBarHeight = 0

const _setScrollBarHeight = () => {
  if (!_isMobile()) {
    const html = document.documentElement
    const body = document.body
    const innerHtml = body.innerHTML
    body.innerHTML = ''

    const div = document.createElement('div')
    div.style.height = '100vh'
    div.style.width = '110vw'
    document.body.appendChild(div)
    window.scrollTo(0, div.scrollHeight)
    scrollBarHeight =
      Math.ceil(window.pageYOffset) - _allExtraHeight(html, body)
    try {
      console.log('dddddddddd - ')
      Vue.prototype.$browserConfig.scrollBarHeight = scrollBarHeight
    } catch (e) {}

    document.body.removeChild(div)

    document.body.innerHTML = innerHtml
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

const _allExtraHeight = (html, body) => {
  let allHeight =
    _getComputedStyle(body, 'margin-top') +
    _getComputedStyle(body, 'margin-bottom') +
    _getComputedStyle(html, 'margin-top') +
    _getComputedStyle(body, 'border-top-width') +
    _getComputedStyle(body, 'border-bottom-width') +
    _getComputedStyle(html, 'border-top-width') +
    _getComputedStyle(html, 'border-bottom-width') +
    _getComputedStyle(body, 'padding-top') +
    _getComputedStyle(body, 'padding-bottom') +
    _getComputedStyle(html, 'padding-top') +
    _getComputedStyle(html, 'padding-bottom')
  if (_hasMarginBottom()) {
    allHeight += _getComputedStyle(html, 'margin-bottom')
  }

  return allHeight
}

const _getComputedStyle = (el, property) => {
  const p = window.getComputedStyle(el, null).getPropertyValue(property)
  console.log(el + ' ----- ', p)
  if (p.indexOf('px') > 0) {
    return _getDimensionNumber(p)
  }
  return p
}

const _getDimensionNumber = dimension => {
  return parseInt(dimension.replace('px', ''))
}

const _hasMarginBottom = () => {
  // in firefox margin-bottom didn't work
  const ua = navigator.userAgent
  let has = true
  if (ua.toLowerCase().indexOf('firefox') !== -1) {
    has = false
  }

  return has
}

_setScrollBarHeight()

Vue.prototype.$browserConfig = {
  setScrollBarHeight: _setScrollBarHeight,
  scrollBarHeight
}
