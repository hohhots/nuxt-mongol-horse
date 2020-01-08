<template>
  <header>
    <div style="text-align:center;margin:0 auto 0;width:273.5px;line-height:0">
      <nuxt-link :to="homeUrl">
        <mon-img src="/images/logo.jpg" width="200px" />
      </nuxt-link>
    </div>
    <div class="container">
      <mon-search />
    </div>
  </header>
</template>

<script>
import gv from '@/mixins/common.js'
import settings from '@/settings.js'

export default {
  mixins: [gv],
  computed: {
    homeUrl() {
      let url = '/'
      if (this.baseUrl === '/' + settings.admin) {
        url = this.baseUrl
      }
      return url
    }
  }
}
</script>

<style scoped>
header {
  margin-top: 40px;
  margin-bottom: 40px;
}

.container {
  margin: 0 auto;
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
}
</style>
