<template>
  <div class="container">
    <Book :book="book" />
    <nuxt-child />
  </div>
</template>

<script>
import { mapState } from 'vuex'

import Book from '@/components/books/Book'

export default {
  components: {
    Book
  },
  computed: {
    ...mapState({
      book: state => state.books.Book
    })
  },
  async fetch({ store, params }) {
    await store.dispatch('books/fetchBook', params.bookid)
  }
}
</script>

<style scoped></style>
