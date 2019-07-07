<template>
  <div class="container">
    <BookPreview :book="book" />
  </div>
</template>

<script>
import { mapState } from 'vuex'

import BookPreview from '@/components/books/BookPreview'

export default {
  components: {
    BookPreview
  },
  computed: {
    ...mapState({
      book: state => state.books.book
    })
  },
  async fetch({ store, params }) {
    await store.dispatch('books/fetchBook', params.bookid)
  }
}
</script>

<style scoped></style>
