<template>
  <div>
    <div class="new-book">{{ monText.newBook }}</div>
    <AdminNewBook :book="newBook" />
  </div>
</template>

<script>
import { mapState } from 'vuex'

import gv from '@/mixins/globalVariables.js'
import AdminNewBook from '@/components/admin/AdminNewBook'

export default {
  components: {
    AdminNewBook
  },
  mixins: [gv],
  computed: {
    ...mapState({
      newBook: state => state.books.newBook
    })
  },
  async fetch({ store, params }) {
    await store.dispatch('books/fetchBook', params.bookid)
  },
  methods: {
    onSave() {
      console.log('new book save')
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
