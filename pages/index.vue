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
  watch: {
    async $route(to, from) {
      const itemsPerPage = settings.itemsPerPage
      const pageid = to.query.page ? parseInt(to.query.page) : 1
      const filter = ''
      const skip = (pageid - 1) * itemsPerPage
      const first = itemsPerPage

      await this.$store.dispatch('books/fetchBooks', {
        filter,
        skip,
        first
      })
    }
  },
  async fetch({ store, query }) {
    const itemsPerPage = settings.itemsPerPage
    const pageid = query.page ? parseInt(query.page) : 1
    const filter = ''
    const skip = (pageid - 1) * itemsPerPage
    const first = itemsPerPage

    await store.dispatch('books/fetchBooks', {
      filter,
      skip,
      first
    })
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
