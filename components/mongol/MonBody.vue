<template>
  <div class="container" :style="{ height: bodyHeight + 'px' }">
    <div class="rotator" :style="{ width: bodyHeight + 'px' }">
      <div ref="mondiv" class="mon-body" :style="{ width: bodyHeight + 'px' }">
        <slot />
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions } from 'vuex'

export default {
  data() {
    return {
      scrollBarHeight: 0,
      bodyHeight: 10
    }
  },
  beforeMount() {
    this._initState()
    window.onresize = () => {
      // When window zooms, scroll bar height will change
      this.$browserConfig.setScrollBarHeight()
      this._initState()
      this._resizeEl()
    }
  },
  mounted() {
    console.log('mounted', this.$browserConfig)
    this._resizeEl()
  },
  methods: {
    _initState() {
      this.setScrollBarHeight(this.$browserConfig.scrollBarHeight)
    },
    _resizeEl() {
      console.log('resize el')
      this.bodyHeight = this.scrollBarHeight
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
      console.log(el + ' ----- ', p)
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
.container,
.rotator {
  box-sizing: border-box;
}

.rotator {
  -webkit-transform-origin: left top;
  -ms-transform-origin: left top;
  transform-origin: left top;
  -webkit-transform: rotate(-90deg) rotateY(180deg);
  transform: rotate(-90deg) rotateY(180deg);
}
</style>
