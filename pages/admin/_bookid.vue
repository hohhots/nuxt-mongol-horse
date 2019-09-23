<template>
  <div class="container">
    <Book :book="book" />
    <nuxt-child />
  </div>
</template>

<script>
import { mapGetters } from 'vuex'

import Book from '@/components/books/Book'

export default {
  components: {
    Book
  },
  computed: {
    ...mapGetters({
      book: 'books/getBook'
    })
  },
  async fetch({ store, params }) {
    await store.dispatch('books/fetchBook', params.bookid)
  }
}
</script>

<style scoped></style>
