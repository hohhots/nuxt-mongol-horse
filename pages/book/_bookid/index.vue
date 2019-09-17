<template>
  <div class="container">
    <BookPreview :book="book" />
  </div>
</template>

<script>
import { mapGetters } from 'vuex'

import BookPreview from '@/components/books/BookPreview'

export default {
  components: {
    BookPreview
  },
  computed: {
    ...mapGetters({
      book: 'books/getBook'
    })
  }
}
</script>

<style scoped></style>
