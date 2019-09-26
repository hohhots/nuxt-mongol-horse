<template>
  <div>
    <section class="new-book">
      <nuxt-link :to="newBookUrl">
        <mon-button>{{ monText.newBook }}</mon-button>
      </nuxt-link>
    </section>
    <section class="existing-books">
      <BooksList :books="books" />
    </section>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'

import Util from '@/util/util'
import settings from '@/settings.js'
import gv from '@/mixins/common.js'
import BooksList from '@/components/books/BooksList'

export default {
  components: {
    BooksList
  },
  mixins: [gv],
  computed: {
    ...mapGetters({
      books: 'books/getBooks'
    }),
    newBookUrl() {
      return `/${settings.admin}/${settings.newBook}`
    }
  },
  watchQuery: ['page'],
  async fetch({ store, query }) {
    await Util.fetchBooks(store, query)
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
