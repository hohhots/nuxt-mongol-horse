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
  head() {
    return {
      title: 'Admin Book Preview'
    }
  },
  components: {
    AdminNewBook
  },
  computed: {
    ...mapGetters({
      book: 'books/getBook'
    })
  }
}
</script>

<style scoped></style>
