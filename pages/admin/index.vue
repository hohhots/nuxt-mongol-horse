<template>
  <div>
    <section class="new-book">
      <nuxt-link to="/admin/new-book">
        <mon-button></mon-button>
      </nuxt-link>
    </section>
    <section class="existing-books">
      <BooksList />
    </section>
  </div>
</template>

<script>
import BooksList from '@/components/books/BooksList'

export default {
  components: {
    BooksList
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
