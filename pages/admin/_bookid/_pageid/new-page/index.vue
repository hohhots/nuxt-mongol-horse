<template>
  <AdminPage :page="page" />
</template>

<script>
import { mapState } from 'vuex'

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
      image: '',
      tempFile: ''
    }
  },
  computed: {
    ...mapState({
      page: state => state.page.newPage
    })
  }
}
</script>

<style scoped></style>
