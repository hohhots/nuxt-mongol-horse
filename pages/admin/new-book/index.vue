<template>
  <div>
    <div class="new-book"></div>
    <AdminNewBook :book="book" />
  </div>
</template>

<script>
import { mapState } from 'vuex'

import AdminNewBook from '@/components/admin/AdminNewBook'

export default {
  components: {
    AdminNewBook
  },
  computed: {
    ...mapState({
      book: state => state.books.book
    })
  },
  async fetch({ store, params }) {
    await store.dispatch('books/fetchBook', params.bookid)
  },
  methods: {
    onSave() {
      console.log(this.newBook)
    },
    onCancel() {
      this.$router.push('/admin')
    }
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
