<template>
  <div>
    <section class="new-book">
      <nuxt-link to="/admin/new-book">
        <mon-button></mon-button>
      </nuxt-link>
    </section>
    <section class="existing-books">
      <BookList />
    </section>
  </div>
</template>

<script>
import BookList from '@/components/books/BookList'

export default {
  components: {
    BookList
  }
}
</script>

<style scoped>
.new-book {
  display: flex;
  justify-content: center;
  align-content: center;
}
</style>
