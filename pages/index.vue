<template>
  <div>
    <div class="book-list">
      <BooksList :books="books" />
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'

import BooksList from '@/components/books/BooksList'

export default {
  components: {
    BooksList
  },
  computed: {
    ...mapState({
      books: state => state.books.booksPreview
    })
  },
  watch: {
    async $route(to, from) {
      await this.$store.dispatch(
        'books/fetchBooksPreview',
        this.$route.query.page
      )
    }
  },
  async fetch({ store, query }) {
    await store.dispatch('books/fetchBooksPreview', query.page)
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
