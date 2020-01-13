<template>
  <header>
    <div class="image-container">
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

.image-container {
  width: 100%;
  text-align: center;
}

.container {
  margin: 0 auto;
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
}
</style>
