<template>
  <div>
    <div>
      <nuxt-link :to="bookLink"> </nuxt-link>
    </div>
    <div>
      <nuxt-link :to="bookLink + '/1'">  1</nuxt-link>
      <nuxt-link :to="bookLink + '/2'">  2</nuxt-link>
      <nuxt-link :to="bookLink + '/3'">  3</nuxt-link>
      <nuxt-link :to="bookLink + '/4'">  4</nuxt-link>
      <nuxt-link :to="bookLink + '/5'">  5</nuxt-link>
    </div>
  </div>
</template>

<script>
export default {
  computed: {
    bookLink() {
      let path = '/book'
      if (this.$route.path.indexOf('admin') > -1) {
        path = '/admin'
      }
      return path + '/' + this.$route.params.bookid
    }
  }
}
</script>

<style lang="scss" scoped></style>
