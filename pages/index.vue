<template>
  <div>
    <div class="book-list">
      <BooksList :books="books" />
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'

import Util from '@/util/util'
// import settings from '@/settings.js'
import BooksList from '@/components/books/BooksList'

export default {
  components: {
    BooksList
  },
  computed: {
    ...mapGetters({
      books: 'books/getBooks'
    })
  },
  watchQuery: ['page'],
  async fetch({ store, query }) {
    await Util.fetchBooks(store, query)
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
