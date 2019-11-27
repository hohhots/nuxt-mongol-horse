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
  watchQuery: ['page'],
  computed: {
    ...mapGetters({
      books: 'books/getBooks'
    })
  },
  async fetch({ store, query, error }) {
    const err = await Util.fetchBooks(store, query)
    if (err) {
      error(err)
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
