<template>
  <div>
    <div class="book-list">
      <BooksList :books="books" />
    </div>
  </div>
</template>

<script>
import Util from '@/util/util'
import BooksList from '@/components/books/BooksList'

export default {
  components: {
    BooksList
  },
  watchQuery: ['page'],
  async asyncData({ store, query }) {
    await Util.fetchBooks(store, query)
    return { books: store.getters['books/getBooks'] }
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
