<template>
  <div ref="container" :style="{ height: height, width: width }">
    <img ref="img" :src="src" v-bind="$attrs" :style="monstyle" />
  </div>
</template>

<script>
import ResizeObserver from 'resize-observer-polyfill'

import util from '@/util/util.js'

export default {
  inheritAttrs: false,
  props: {
    state: {
      type: Boolean,
      default: true
    },
    src: {
      type: String,
      default: ''
    },
    monstyle: {
      type: String,
      default: ''
    }
  },
  data() {
    return {
      width: '100%',
      height: '100%'
    }
  },
  watch: {
    state(newv, oldv) {
      this._initState()
    }
  },
  mounted() {
    this.$refs.img.onload = () => {
      this.setEvents()
      this._initState()
    }
  },
  methods: {
    _initState(s) {
      if (!this.$refs.img) {
        return
      }
      // reset image height
      this.$refs.img.style.height = 'auto'

      const height = util.getComputedStyle(this.$refs.img, 'height')
      const cWidth = util.getComputedStyle(
        this.$refs.container.parentElement,
        'width'
      )
      if (height > cWidth) {
        this.$refs.img.style.height = cWidth + 'px'
      }
      this.height = util.getComputedStyle(this.$refs.img, 'width') + 'px'
      this.width = util.getComputedStyle(this.$refs.img, 'height') + 'px'
    },
    setEvents() {
      const ro = new ResizeObserver((entries, observer) => {
        this._initState()
      })

      ro.observe(this.$refs.container.parentElement)
    }
  }
}
</script>

<style scoped>
div {
  position: relative;
  display: inline-block;
}
img {
  position: absolute;
  display: inline-block;
  left: 0;
  -webkit-transform-origin: left top;
  -ms-transform-origin: left top;
  transform-origin: left top;
  -webkit-transform: rotate(-90deg) rotateY(180deg);
  transform: rotate(-90deg) rotateY(180deg);
}
</style>
