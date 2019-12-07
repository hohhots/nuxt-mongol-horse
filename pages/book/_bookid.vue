<template>
  <div class="container">
    <Book :book="book" />
    <nuxt-child />
  </div>
</template>

<script>
import Book from '@/components/books/Book'

export default {
  components: {
    Book
  },
  async asyncData({ store, params, error }) {
    const err = await store.dispatch('books/fetchBook', params.bookid)
    if (err) {
      error(err)
    }
    return { book: store.getters['books/getBook'] }
  }
}
</script>

<style scoped>
.container {
  padding: 15px;
}
</style>
