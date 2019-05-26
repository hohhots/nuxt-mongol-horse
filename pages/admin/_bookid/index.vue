<template>
  <div class="admin-book-page">
    <section>
      <Book />
    </section>
    <section class="update-book-page">
      <AdminNewBookForm />
    </section>
  </div>
</template>

<script>
import Book from '@/components/books/Book'
import AdminNewBookForm from '@/components/admin/AdminNewBookForm'

export default {
  components: {
    Book,
    AdminNewBookForm
  }
}
</script>

<style scoped></style>
