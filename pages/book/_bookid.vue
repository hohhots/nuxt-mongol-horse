<template>
  <div class="container">
    <Book />
    <nuxt-child />
  </div>
</template>

<script>
import Book from '@/components/books/Book'

export default {
  components: {
    Book
  },
  data: function() {
    return {
      rootPath: this.$route.path,
      bookId: this.$route.params.bookid
    }
  }
}
</script>

<style lang="scss" scoped></style>
