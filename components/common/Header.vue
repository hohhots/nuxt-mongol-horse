<template>
  <div>
    <div style="text-align:center;margin:0 auto 0;width:273.5px;line-height:0">
      <nuxt-link :to="homeUrl">
        <mon-img src="/images/logo.jpg" width="200px" />
      </nuxt-link>
    </div>
    <div class="container">
      <mon-search />
    </div>
  </div>
</template>

<script>
export default {
  computed: {
    homeUrl() {
      const admin = '/admin'
      const path = this.$route.path
      if (path === admin || path.indexOf(admin + '/') === 0) {
        return admin
      }
      return '/'
    }
  }
}
</script>

<style scoped>
.container {
  margin: 0 auto;
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
}
</style>
