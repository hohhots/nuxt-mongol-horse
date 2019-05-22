<template>
  <div>
    <div class="book-list">
      <BookList />
    </div>
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
.container {
  margin: 0 auto;
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
}
</style>
