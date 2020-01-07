<template>
  <div class="buttons">
    <div class="sava-cancel">
      <mon-button type="submit" width="70px">{{ monText.save }}</mon-button>

      <mon-button @click="$emit('cancel')" type="button" width="70px">{{
        monText.cancel
      }}</mon-button>
    </div>

    <div v-if="isLastPage()" class="new-page">
      <mon-button @click="$emit('newPage')" type="button" width="70px">
        {{ monText.newPage }}
      </mon-button>
    </div>
  </div>
</template>

<script>
import _ from 'lodash'
import { mapGetters } from 'vuex'

import settings from '@/settings.js'
import common from '@/mixins/common.js'

export default {
  mixins: [common],
  computed: mapGetters({
    book: 'book/getBook'
  }),
  methods: {
    isLastPage() {
      if (this.$route.path === '/' + settings.auth) {
        return false
      }
      if (
        this.$route.path.indexOf('/' + settings.newBook) > -1 ||
        this.$route.path.indexOf('/' + settings.newPage) > -1
      ) {
        return false
      }
      const pageId = this.getPageURLid(this.$route.params.pageid)
      return pageId === this.book.pages.length
    },
    getPageURLid(pageid) {
      const order = _.findIndex(this.book.pages, function(page) {
        return page.id === pageid
      })
      return order + 1
    }
  }
}
</script>

<style scoped>
mon-button {
  width: 70px;
}
.buttons,
.sava-cancel,
.new-page {
  display: flex;
  justify-content: space-evenly;
}
.buttons {
  flex-flow: column;
}
.sava-cancel {
  align-items: unset;
}
.new-page {
  border-top: 1px dashed #cfcfcf;
  padding-top: 49px;
  margin-top: 2rem;
}
</style>
