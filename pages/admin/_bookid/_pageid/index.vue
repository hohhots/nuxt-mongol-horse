<template>
  <AdminPage :page="page" />
</template>

<script>
import common from '@/mixins/common.js'

import AdminPage from '@/components/admin/AdminPage'

export default {
  components: {
    AdminPage
  },
  mixins: [common],
  async asyncData({ store, params }) {
    await store.dispatch('books/fetchPage', params.pageid)
    return { page: store.getters['books/getPage'] }
  }
}
</script>

<style scoped></style>
