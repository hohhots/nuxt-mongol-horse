<template>
  <div ref="container" :style="{ height: height + 'px', width: width + 'px' }">
    <svg ref="svg" v-bind="$attrs">
      <slot></slot>
    </svg>
  </div>
</template>

<script>
import util from '@/util/util.js'

export default {
  inheritAttrs: false,
  data() {
    return {
      width: 0,
      height: 0
    }
  },
  mounted() {
    this._initState()
  },
  updated() {
    this._initState()
  },
  methods: {
    _initState() {
      this.height =
        this.$refs.svg.viewBox.baseVal.width ||
        util.getComputedStyle(this.$refs.svg, 'width')
      this.width =
        this.$refs.svg.viewBox.baseVal.height ||
        util.getComputedStyle(this.$refs.svg, 'height')
    }
  }
}
</script>

<style scoped>
div {
  display: inline-block;
  margin: 0;
  padding: 0;
}
svg {
  -webkit-transform-origin: left top;
  -ms-transform-origin: left top;
  transform-origin: left top;
  -webkit-transform: rotate(-90deg) rotateY(180deg);
  transform: rotate(-90deg) rotateY(180deg);
}
</style>
