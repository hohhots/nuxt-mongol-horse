<template>
  <div>
    <section class="new-book">
      <nuxt-link to="/admin/new-book">
        <mon-button>{{ monText.newBook }}</mon-button>
      </nuxt-link>
    </section>
    <section class="existing-books">
      <BooksList :books="books" />
    </section>
  </div>
</template>

<script>
import { mapState } from 'vuex'

import settings from '@/settings.js'
import gv from '@/mixins/globalVariables.js'
import BooksList from '@/components/books/BooksList'

export default {
  components: {
    BooksList
  },
  mixins: [gv],
  computed: {
    ...mapState({
      books: state => state.books.Books
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
.new-book {
  display: flex;
  justify-content: center;
  align-content: center;
  margin-bottom: 2rem;
}
</style>
