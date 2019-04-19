<template>
  <div
    class="mon-body"
    :style="{ height: `${divWidth}px`, width: `${divHeight}px` }"
  >
    <slot />
  </div>
</template>

<script>
import { mapActions } from 'vuex'

export default {
  data() {
    return {
      scrollBarHeight: 0,
      divWidth: 0,
      divHeight: 0
    }
  },
  beforeMount() {
    this._setScrollBarHeight()

    window.onresize = () => {
      // When window zooms, scroll bar height will change
      this._setScrollBarHeight()
    }
  },
  mounted() {
    console.log(this.$el)
  },
  methods: {
    _setScrollBarHeight() {
      if (!this._isMobile()) {
        const html = document.documentElement
        const body = document.body

        const innerHtml = body.innerHTML
        body.innerHTML = ''

        const div = document.createElement('div')
        div.style.height = '100vh'
        div.style.width = '110vw'
        document.body.appendChild(div)
        window.scrollTo(0, div.scrollHeight)
        this.scrollBarHeight =
          Math.ceil(window.pageYOffset) - this._allExtraHeight(html, body)
        this.setScrollBarHeight(this.scrollBarHeight)
        document.body.removeChild(div)

        document.body.innerHTML = innerHtml
      }
    },
    _isMobile() {
      const ua = navigator.userAgent
      // memoized values
      const isIphone =
        ua.toLowerCase().indexOf('iphone') !== -1 ||
        ua.toLowerCase().indexOf('ipod') !== -1
      const isIpad = ua.toLowerCase().indexOf('ipad') !== -1
      const isAndroid = ua.toLowerCase().indexOf('android') !== -1
      return isIphone || isIpad || isAndroid
    },
    _hasMarginBottom() {
      // in firefox margin-bottom didn't work
      const ua = navigator.userAgent
      let has = true
      if (ua.toLowerCase().indexOf('firefox') !== -1) {
        has = false
      }

      return has
    },
    _getComputedStyle(el, property) {
      const p = window.getComputedStyle(el, null).getPropertyValue(property)
      if (p.indexOf('px') > 0) {
        return this._getDimensionNumber(p)
      }
      return p
    },
    _getDimensionNumber(dimension) {
      return parseInt(dimension.replace('px', ''))
    },
    _allExtraHeight(html, body) {
      let allHeight =
        this._getComputedStyle(body, 'margin-top') +
        this._getComputedStyle(body, 'margin-bottom') +
        this._getComputedStyle(html, 'margin-top') +
        this._getComputedStyle(body, 'border-top-width') +
        this._getComputedStyle(body, 'border-bottom-width') +
        this._getComputedStyle(html, 'border-top-width') +
        this._getComputedStyle(html, 'border-bottom-width') +
        this._getComputedStyle(body, 'padding-top') +
        this._getComputedStyle(body, 'padding-bottom') +
        this._getComputedStyle(html, 'padding-top') +
        this._getComputedStyle(html, 'padding-bottom')
      if (this._hasMarginBottom()) {
        allHeight += this._getComputedStyle(html, 'margin-bottom')
      }

      return allHeight
    },
    ...mapActions({ setScrollBarHeight: 'clientState/setScrollBarHeight' })
  }
}
</script>

<style scoped>
.mon-body {
  box-sizing: border-box;
  -webkit-transform-origin: left top;
  -ms-transform-origin: left top;
  transform-origin: left top;
  -webkit-transform: rotate(-90deg) rotateY(180deg);
  transform: rotate(-90deg) rotateY(180deg);
  min-width: 100vh;
}
</style>
