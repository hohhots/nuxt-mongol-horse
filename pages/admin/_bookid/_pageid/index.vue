<template>
  <AdminPage :page="page" />
</template>

<script>
import { mapGetters } from 'vuex'

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
  computed: {
    ...mapGetters({
      page: 'books/getPage'
    })
  },
  async fetch({ error, store, params }) {
    const err = await store.dispatch('books/fetchPage', params.pageid)
    if (err) {
      error(err)
    }
  }
}
</script>

<style scoped></style>
