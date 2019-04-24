<template>
  <div class="mv-container">
    <div class="mv-rotator" :style="{ width: bodyHeight + 'px' }">
      <div ref="mv-div" class="mv-body" :style="{ width: bodyHeight + 'px' }">
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
      scrollBarHeight: 0
    }
  },
  computed: {
    bodyHeight() {
      return this.scrollBarHeight
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
      this.scrollBarHeight = this.$browserConfig.scrollBarHeight
    },
    _resizeEl() {
      console.log('resize el', this.scrollBarHeight)
    },
    _getComputedStyle(el, property) {
      const p = window.getComputedStyle(el, null).getPropertyValue(property)
      if (p.indexOf('px') > 0) {
        return parseFloat(p)
      }
      return p
    },
    ...mapActions({ setScrollBarHeight: 'clientState/setScrollBarHeight' })
  }
}
</script>

<style scoped>
.mv-container {
  height: 100vh;
}

.mv-container,
.mv-rotator {
  box-sizing: border-box;
}

.mv-rotator {
  -webkit-transform-origin: left top;
  -ms-transform-origin: left top;
  transform-origin: left top;
  -webkit-transform: rotate(-90deg) rotateY(180deg);
  transform: rotate(-90deg) rotateY(180deg);
}
</style>
