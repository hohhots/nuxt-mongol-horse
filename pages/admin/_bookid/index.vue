<template>
  <div class="admin-book-page">
    <section class="update-book-page">
      <AdminNewBook :book="book" />
    </section>
  </div>
</template>

<script>
import { mapState } from 'vuex'

import AdminNewBook from '@/components/admin/AdminNewBook'

export default {
  components: {
    AdminNewBook
  },
  computed: {
    ...mapState({
      book: state => state.books.Book
    })
  },
  async fetch({ store, params }) {
    await store.dispatch('books/fetchBook', params.bookid)
  }
}
</script>

<style scoped></style>
