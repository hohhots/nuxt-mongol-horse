<template>
  <div>
    <div class="book-list">
      <BooksList />
    </div>
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
.container {
  margin: 0 auto;
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
}
</style>
