<template>
  <div class="container">
    <BookPreview :book="book" />
  </div>
</template>

<script>
import { mapGetters } from 'vuex'

import BookPreview from '@/components/books/BookPreview'

export default {
  head() {
    return {
      title: 'A Book Preview'
    }
  },
  components: {
    BookPreview
  },
  computed: mapGetters({
    book: 'book/getBook'
  })
}
</script>

<style scoped></style>
