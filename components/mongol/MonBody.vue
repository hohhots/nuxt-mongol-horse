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
        const html = document.body.innerHTML
        document.body.innerHTML = ''

        const div = document.createElement('div')
        div.style.height = '100vh'
        div.style.width = '110vw'
        document.body.appendChild(div)
        window.scrollTo(0, div.scrollHeight)
        this.scrollBarHeight = Math.ceil(window.pageYOffset)
        console.log(window.pageYOffset)
        document.body.removeChild(div)

        document.body.innerHTML = html
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
