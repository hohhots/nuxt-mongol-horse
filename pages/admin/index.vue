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
  head() {
    return {
      title: 'Admin All Books'
    }
  },
  components: {
    BooksList
  },
  mixins: [gv],
  computed: {
    newBookUrl() {
      return `/${settings.admin}/${settings.newBook}`
    },
    ...mapGetters({
      books: 'book/getBooks'
    })
  },
  watchQuery: ['page'],
  async fetch({ store, query, error }) {
    const err = await Util.fetchBooks(store, query)
    if (err) {
      error(err)
    }
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
