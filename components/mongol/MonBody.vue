<template>
  <div class="mon-body">
    <slot />
  </div>
</template>

<script>
export default {
  data() {
    return {
      scrollBarHeight: {
        type: Number,
        default: 0
      },
      divHeight: {
        type: Number
      }
    }
  },
  beforeMount() {
    this.setScrollBarHeight()
  },
  methods: {
    setScrollBarHeight() {
      if (!this.isMobile()) {
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
          Math.ceil(window.pageYOffset) -
          this.getComputedStyle(body, 'margin-top') -
          this.getComputedStyle(body, 'margin-bottom') -
          this.getComputedStyle(html, 'margin-top')
        if (this.hasMarginBottom()) {
          this.scrollBarHeight -= this.getComputedStyle(html, 'margin-bottom')
        }
        console.log(this.scrollBarHeight)
        document.body.removeChild(div)

        document.body.innerHTML = innerHtml
      }
    },
    isMobile() {
      const ua = navigator.userAgent
      // memoized values
      const isIphone =
        ua.toLowerCase().indexOf('iphone') !== -1 ||
        ua.toLowerCase().indexOf('ipod') !== -1
      const isIpad = ua.toLowerCase().indexOf('ipad') !== -1
      const isAndroid = ua.toLowerCase().indexOf('android') !== -1
      return isIphone || isIpad || isAndroid
    },
    hasMarginBottom() {
      // in firefox margin-bottom didn't work
      const ua = navigator.userAgent
      let has = true
      if (ua.toLowerCase().indexOf('firefox') !== -1) {
        has = false
      }

      return has
    },
    getComputedStyle(el, property) {
      const p = window.getComputedStyle(el, null).getPropertyValue(property)
      if (p.indexOf('px') > 0) {
        return this.getDimensionNumber(p)
      }
      return p
    },
    getDimensionNumber(dimension) {
      return parseInt(dimension.replace('px', ''))
    }
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
  min-height: 100vw;
}
</style>
