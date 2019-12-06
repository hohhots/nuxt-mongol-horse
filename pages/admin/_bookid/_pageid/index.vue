<template>
  <AdminPage :page="page" />
</template>

<script>
import common from '@/mixins/common.js'

import AdminPage from '@/components/admin/AdminPage'

export default {
  head() {
    return {
      title: 'Admin Page'
    }
  },
  components: {
    AdminPage
  },
  mixins: [common],
  async asyncData({ store, params, error }) {
    const err = await store.dispatch('books/fetchPage', params.pageid)
    if (err) {
      error(err)
    }
    return { page: store.getters['books/getPage'] }
  }
}
</script>

<style scoped></style>
