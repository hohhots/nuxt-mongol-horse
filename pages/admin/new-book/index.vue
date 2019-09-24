<template>
  <div>
    <div class="new-book">{{ monText.newBook }}</div>
    <AdminNewBook :book="newBook" />
  </div>
</template>

<script>
import { mapState } from 'vuex'

import gv from '@/mixins/common.js'
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
