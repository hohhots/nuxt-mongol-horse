<template>
  <div ref="container" :style="{ height: height, width: width }">
    <img ref="img" :src="src" v-bind="$attrs" :style="monstyle" />
  </div>
</template>

<script>
/* eslint-disable */
import util from '@/util/util.js'

export default {
  inheritAttrs: false,
  props: {
    src: String,
    monstyle: String
  },
  data() {
    return {
      width: '100%',
      height: '100%'
    }
  },
  mounted() {
    this._initState()
  },
  updated() {
    this._initState()
  },
  methods: {
    _initState(s) {
      this.height = util.getComputedStyle(this.$refs.img, 'width') + 'px'
    }
  }
}
</script>

<style scoped>
div {
  position: relative;
  display: inline-block;
  border: 1px solid #0f0;
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
