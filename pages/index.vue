<template>
  <div>
    <div class="book-list">
      <BooksList :books="books" />
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'

import settings from '@/settings.js'
import Util from '@/util/util'
import BooksList from '@/components/books/BooksList'

export default {
  head() {
    return {
      title: 'All Books'
    }
  },
  components: {
    BooksList
  },
  watchQuery: ['search', 'page'],
  computed: mapGetters({
    books: 'book/getBooks'
  }),
  async fetch({ store, query, error }) {
    try {
      await Util.fetchBooks(store, query)
    } catch (e) {
      error({
        statusCode: 503,
        message: settings.mErrorMessages.fetchBooksError
      })
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
