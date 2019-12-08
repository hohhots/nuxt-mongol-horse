<template>
  <div class="container">
    <Book :book="book" />
    <nuxt-child />
  </div>
</template>

<script>
import { mapGetters } from 'vuex'

import settings from '@/settings.js'
import Book from '@/components/books/Book'

export default {
  components: {
    Book
  },
  computed: mapGetters({
    book: 'book/getBook'
  }),
  async fetch({ store, params, error }) {
    try {
      await store.dispatch('book/fetchBook', params.bookid)
    } catch (e) {
      error({
        statusCode: 503,
        message: settings.mErrorMessages.fetchBookError
      })
    }
  }
}
</script>

<style scoped>
.container {
  padding: 15px;
}
</style>
