<template>
  <div class="admin-book-page">
    <section class="update-book-page">
      <AdminNewBook :book="book" />
    </section>
  </div>
</template>

<script>
import AdminNewBook from '@/components/admin/AdminNewBook'

export default {
  components: {
    AdminNewBook
  },
  asyncData({ store, params }) {
    return { book: store.getters['books/getBook'] }
  }
}
</script>

<style scoped></style>
