<template>
  <AdminPage :page="page" />
</template>

<script>
import _ from 'lodash'

import common from '@/mixins/common.js'
import AdminPage from '@/components/admin/AdminPage'

export default {
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
      return _.assign({}, store.state.page.newPage, {
        pageNum: _.last(store.getters['book/getBook'].pages).pageNum + 1 + ''
      })
    }
  }
}
</script>

<style scoped></style>
