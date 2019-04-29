<template>
  <div
    ref="container"
    class="mv-container"
    :style="{ height: getContainerHeight + 'px', width: rotatorHeight + 'px' }"
  >
    <div
      ref="rotator"
      class="mv-rotator"
      :style="{ width: getContainerHeight + 'px' }"
    >
      <div ref="mvbody" class="mv-body">
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
      rotatorHeight: 0,
      mvbodyWidth: 0
    }
  },
  computed: {
    getContainerHeight() {
      return this.bodyContentHeight > this.mvbodyWidth
        ? this.bodyContentHeight
        : this.mvbodyWidth
    }
  },
  beforeMount() {
    this.windowContentHeight = this._getWindowContentHeight()
    // Just call when first load to initial state
    this._initState()
  },
  mounted() {
    this.html = document.documentElement
    this.body = document.body
    this._resizeEl()

    // if scrollbar x disappeared after mon div rotated
    const cWHeight = this._getWindowContentHeight()
    if (this.windowContentHeight < cWHeight) {
      this._setBodyContentHeight(this.bodyContentHeight + this.scrollBarHeight)
      this.windowContentHeight = cWHeight
    }

    this.$refs.measure.style.width = 0
    this.$refs.measure.style.zIndex = -9999

    this._setEvents()
  },
  methods: {
    _setBodyContentHeight(height) {
      this.bodyContentHeight = height
      this.setBodyContentHeight(height)
    },
    _setScrollBarHeight(height) {
      this.scrollBarHeight = height
      this.setScrollBarHeight(height)
    },
    _getWindowContentHeight() {
      return util.getComputedStyle(
        document.getElementById('mv-measure'),
        'height'
      )
    },
    _getMvbodyWidth() {
      const mvbody = this.$refs.mvbody
      const leftBorderWidth = util.getComputedStyle(mvbody, 'border-left-width')
      const rightBorderWidth = util.getComputedStyle(
        mvbody,
        'border-right-width'
      )
      const leftPadding = util.getComputedStyle(mvbody, 'padding-left')
      const rightPadding = util.getComputedStyle(mvbody, 'padding-right')
      const leftMargin = util.getComputedStyle(mvbody, 'margin-left')
      const rightMargin = util.getComputedStyle(mvbody, 'margin-right')
      const boxSizing = util
        .getComputedStyle(mvbody, 'box-sizing')
        .toLowerCase()
      let width = util.getComputedStyle(mvbody, 'width')
      width += leftMargin + rightMargin
      if (boxSizing === 'border-box') {
        return width
      }

      return (width +=
        leftBorderWidth + rightBorderWidth + leftPadding + rightPadding)
    },
    _initState() {
      this._setScrollBarHeight(this.$browserConfig.scrollBarHeight)
      this._setBodyContentHeight(this.$browserConfig.bodyContentHeight)
    },
    _resizeEl() {
      console.log('resize')
      this.html.removeAttribute('style')
      this.rotatorHeight = util.getComputedStyle(this.$refs.rotator, 'height')

      this.body.style.width = util.getBodyWidth(this.rotatorHeight) + 'px'
      this.html.style.width = util.getHtmlWidth() + 'px'
    },
    _setEvents() {
      window.onresize = () => {
        this.windowContentHeight = this._getWindowContentHeight()
        // When window zooms, window state will change
        this.$browserConfig.setBrowserState()
        this._initState()
        this._resizeEl()
      }

      window.onwheel = e => {
        let left = window.pageXOffset
        const top = window.pageYOffset

        left += e.deltaY
        if (util.isFirefox()) {
          left += e.deltaY * 24
        }

        window.scrollTo(left, top)
      }
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
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 10000;
}
</style>
