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

import gv from '@/mixins/globalVariables.js'
import BooksList from '@/components/books/BooksList'

export default {
  components: {
    BooksList
  },
  mixins: [gv],
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
.new-book {
  display: flex;
  justify-content: center;
  align-content: center;
  margin-bottom: 2rem;
}
</style>
