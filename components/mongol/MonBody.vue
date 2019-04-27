<template>
  <div
    ref="container"
    class="mv-container"
    :style="{ height: bodyContentHeight + 'px', width: rotatorHeight + 'px' }"
  >
    <div
      ref="rotator"
      class="mv-rotator"
      :style="{ width: bodyContentHeight + 'px' }"
    >
      <div ref="mv-div" class="mv-body">
        <slot />
      </div>
    </div>
    <div id="mv-measure" ref="measure" class="measure"></div>
  </div>
</template>

<script>
import { mapActions } from 'vuex'

import util from '@/util/util.js'

export default {
  data() {
    return {
      html: '',
      body: '',
      windowContentHeight: 0,
      scrollBarHeight: 0,
      bodyContentHeight: 0,
      rotatorHeight: 0
    }
  },
  computed: {
    bodyHeight() {
      return this.scrollBarHeight
    }
  },
  beforeMount() {
    this.windowContentHeight = this._getWindowContentHeight()
    this._initState()
    window.onresize = () => {
      // When window zooms, scroll bar height will change
      this.$browserConfig.setBrowserState()
      this._initState()
      this._resizeEl()
    }
  },
  mounted() {
    this.html = document.documentElement
    this.body = document.body
    this._resizeEl()
    const cWHeight = this._getWindowContentHeight()
    if (this.windowContentHeight < cWHeight) {
      this.bodyContentHeight += this.scrollBarHeight
      this.windowContentHeight = cWHeight
    }
    this.$refs.measure.style.zIndex = -9999
  },
  methods: {
    _getWindowContentHeight() {
      return util.getComputedStyle(
        document.getElementById('mv-measure'),
        'height'
      )
    },
    _initState() {
      this.scrollBarHeight = this.$browserConfig.scrollBarHeight
      this.setScrollBarHeight(this.scrollBarHeight)
      this.bodyContentHeight = this.$browserConfig.bodyContentHeight
      this.setBodyContentHeight(this.bodyContentHeight)
    },
    _resizeEl() {
      this.html.removeAttribute('style')
      this.rotatorHeight = util.getComputedStyle(this.$refs.rotator, 'height')
      this.body.style.width = util.getBodyWidth(this.rotatorHeight) + 'px'
      this.html.style.width = util.getHtmlWidth() + 'px'
    },
    _getComputedStyle(el, property) {
      const p = window.getComputedStyle(el, null).getPropertyValue(property)
      if (p.indexOf('px') > 0) {
        return parseFloat(p)
      }
      return p
    },
    ...mapActions({
      setScrollBarHeight: 'clientState/setScrollBarHeight',
      setBodyContentHeight: 'clientState/setBodyContentHeight'
    })
  }
}
</script>

<style scoped>
.mv-container,
.mv-rotator {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
}

.mv-rotator {
  -webkit-transform-origin: left top;
  -ms-transform-origin: left top;
  transform-origin: left top;
  -webkit-transform: rotate(-90deg) rotateY(180deg);
  transform: rotate(-90deg) rotateY(180deg);
}

.measure {
  position: absolute;
  opacity: 1;
  background-color: #fff;
  top: 0;
  width: 100%;
  height: 100%;
  z-index: 10000;
}
</style>
