<template>
  <AdminPage :page="page" />
</template>

<script>
import { mapGetters } from 'vuex'
import common from '@/mixins/common.js'

import AdminPage from '@/components/admin/AdminPage'

export default {
  components: {
    AdminPage
  },
  mixins: [common],
  computed: {
    page() {
      return this.getPage()(this.$route.params.pageid, this.editExistingPage)
    }
  },
  methods: {
    ...mapGetters({
      getPage: 'books/getPage'
    })
  }
}
</script>

<style scoped></style>
