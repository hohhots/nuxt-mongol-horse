<template>
  <div
    ref="container"
    :style="{ height: bodyContentHeight + 'px', width: rotatorHeight + 'px' }"
    class="mv-container"
  >
    <div
      ref="rotator"
      :style="{ width: bodyContentHeight + 'px' }"
      class="mv-rotator"
    >
      <div ref="mvbody" class="mv-body">
        <div class="slot-container">
          <slot />
        </div>
      </div>
    </div>
    <div id="mv-measure" ref="measure" class="measure"></div>
  </div>
</template>

<script>
import ResizeObserver from 'resize-observer-polyfill'

import browser from '@/mixins/browser.js'
import util from '@/util/util.js'

export default {
  mixins: [browser],
  data() {
    return {
      html: '',
      body: '',
      rotatorHeight: 0
    }
  },
  mounted() {
    this.html = document.documentElement
    this.body = document.body

    this.$refs.measure.style.width = 0
    this.$refs.measure.style.zIndex = -99999

    this.setEvents()
  },
  methods: {
    resizeEl() {
      this.html.removeAttribute('style')
      this.rotatorHeight = util.getComputedStyle(this.$refs.rotator, 'height')

      this.body.style.width = this.getBodyWidth(this.rotatorHeight) + 'px'
      this.html.style.width = this.getHtmlWidth() + 'px'
    },
    resizeAll() {
      // When window zooms, window state will change
      this.setBrowserState(util.getComputedStyle(this.$refs.measure, 'height'))
      this.resizeEl()
    },
    setEvents() {
      window.onwheel = e => {
        let left = window.pageXOffset
        const top = window.pageYOffset

        left += e.deltaY
        if (this.isFirefox()) {
          left += e.deltaY * 24
        }

        window.scrollTo(left, top)
      }

      const ro = new ResizeObserver((entries, observer) => {
        this.resizeAll()
      })

      ro.observe(this.$refs.measure)
      ro.observe(this.$refs.mvbody)
    }
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

.mv-body {
  display: flex;
  justify-content: center;
  align-content: center;
}

.measure {
  position: absolute;
  opacity: 1;
  background-color: transparent;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 10000;
}

.slot-container {
  width: 100%;
}

@media only screen and (min-height: 600px) {
  .slot-container {
    width: 80%;
  }
}
</style>
