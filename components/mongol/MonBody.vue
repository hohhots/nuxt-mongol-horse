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
      html: '',
      scrollBarHeight: 0,
      htmlContentHeight: 0
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
      this.$browserConfig.setBrowserState()
      this._initState()
      this._resizeEl()
    }
  },
  mounted() {
    console.log('mounted', this.$browserConfig)
    this.html = document.documentElement
    this._resizeEl()
  },
  methods: {
    _initState() {
      this.scrollBarHeight = this.$browserConfig.scrollBarHeight
      this.setScrollBarHeight(this.scrollBarHeight)
      this.htmlContentHeight = this.$browserConfig.htmlContentHeight
      this.setHtmlContentHeight(this.htmlContentHeight)
    },
    _resizeEl() {
      console.log('resize el', this.scrollBarHeight)
      this.html.style.height = this.htmlContentHeight + 'px'
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
      setHtmlContentHeight: 'clientState/setHtmlContentHeight'
    })
  }
}
</script>

<style scoped>
.mv-container,
.mv-rotator {
  box-sizing: border-box;
}

.mv-rotator {
  /* -webkit-transform-origin: left top;
  -ms-transform-origin: left top;
  transform-origin: left top;
  -webkit-transform: rotate(-90deg) rotateY(180deg);
  transform: rotate(-90deg) rotateY(180deg); */
}
</style>
