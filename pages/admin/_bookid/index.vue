<template>
  <div class="admin-book-page">
    <section class="update-book-page">
      <AdminNewBook :book="book" />
    </section>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'

import AdminNewBook from '@/components/admin/AdminNewBook'

export default {
  components: {
    AdminNewBook
  },
  computed: {
    ...mapGetters({
      book: 'books/getBook'
    })
  },
  async fetch({ store, params }) {
    await store.dispatch('books/fetchBook', params.bookid)
  }
}
</script>

<style scoped></style>
