<template>
  <AdminPage :page="page" />
</template>

<script>
import { mapGetters } from 'vuex'

import settings from '@/settings.js'
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
  computed: mapGetters({
    page: 'page/getPage'
  }),
  async fetch({ store, params, error }) {
    let book = store.getters['book/getBook']
    if (!book) {
      try {
        await store.dispatch('book/fetchBook')
      } catch (e) {
        error({
          statusCode: 503,
          message: settings.mErrorMessages.fetchBookError
        })
      }
      book = store.getters['book/getBook']
    }
    try {
      await store.dispatch('page/fetchPage', { book, pageid: params.pageid })
    } catch (e) {
      error({
        statusCode: 503,
        message: settings.mErrorMessages.fetchPageError
      })
    }
  }
}
</script>

<style scoped></style>
