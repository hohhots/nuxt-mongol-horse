<template>
  <AdminPage :page="page" />
</template>

<script>
import { mapGetters } from 'vuex'
import globalVariables from '@/mixins/globalVariables.js'

import AdminPage from '@/components/admin/AdminPage'

export default {
  components: {
    AdminPage
  },
  mixins: [globalVariables],
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

<style lang="scss" scoped></style>
