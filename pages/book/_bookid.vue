<template>
  <div class="container">
    <mon-header />
    <div>
      <nuxt-link :to="'/book/' + bookId"> </nuxt-link>
    </div>
    <div>
      <nuxt-link :to="rootPath + '/1'">  1</nuxt-link>
      <nuxt-link :to="rootPath + '/2'">  2</nuxt-link>
      <nuxt-link :to="rootPath + '/3'">  3</nuxt-link>
      <nuxt-link :to="rootPath + '/4'">  4</nuxt-link>
      <nuxt-link :to="rootPath + '/5'">  5</nuxt-link>
    </div>

    <nuxt-child />
  </div>
</template>

<script>
export default {
  data: function() {
    return {
      rootPath: this.$route.path,
      bookId: this.$route.params.bookid
    }
  },
  created: function() {
    console.log(this.$route)
    this.rootPath = this.$route.path
  }
}
</script>

<style scoped></style>
