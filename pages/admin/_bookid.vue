<template>
  <div class="container">
    <Book />
    <nuxt-child />
  </div>
</template>

<script>
import Book from '@/components/books/Book'

export default {
  components: {
    Book
  }
}
</script>

<style lang="scss" scoped></style>
