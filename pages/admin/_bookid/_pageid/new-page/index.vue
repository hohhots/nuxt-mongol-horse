<template>
  <AdminPage :page="page" />
</template>

<script>
import _ from 'lodash'

import common from '@/mixins/common.js'
import AdminPage from '@/components/admin/AdminPage'

export default {
  layout: 'admin',
  head() {
    return {
      title: 'Add New Page'
    }
  },
  components: {
    AdminPage
  },
  mixins: [common],
  data: function() {
    return {
      page: this.setNewPage()
    }
  },
  methods: {
    setNewPage() {
      const store = this.$store
      const page = _.last(store.getters['book/getBook'].pages)
      const pageNum = page ? page.pageNum : 0
      return _.assign({}, store.state.page.newPage, {
        pageNum: pageNum + 1 + ''
      })
    }
  }
}
</script>

<style scoped></style>
