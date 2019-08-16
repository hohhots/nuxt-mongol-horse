<template>
  <div class="buttons">
    <div class="sava-cancel">
      <mon-button type="submit" width="70px">{{ monText.save }}</mon-button>

      <mon-button type="button" width="70px" @click="$emit('cancel')">{{ monText.cancel }}</mon-button>
    </div>

    <div v-if="isLastPage()" class="new-page">
      <mon-button type="button" width="70px" @click="$emit('newPage')">
        {{
        monText.newPage
        }}
      </mon-button>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'

import globalVariables from '@/mixins/globalVariables.js'

export default {
  mixins: [globalVariables],
  computed: {
    ...mapState({
      book: state => state.books.book
    })
  },
  beforeMount() {
    console.log(this.book)
  },
  methods: {
    isLastPage() {
      const pageId = parseInt(this.$route.params.pageid) || 0
      return pageId === this.book.pages.length
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
