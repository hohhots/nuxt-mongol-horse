<template>
  <div class="container">
    <div class="types">
      <mon-button @click="toggle(0)" class="item" width="70px">{{
        monText.text
      }}</mon-button>
      <mon-button @click="toggle(1)" class="item" width="70px">{{
        monText.photo
      }}</mon-button>
      <mon-button @click="toggle(2)" class="item" width="70px">{{
        monText.together
      }}</mon-button>
    </div>
    <div class="content">
      <div class="img-container">
        <mon-img
          v-show="displayImage && imgSrc"
          :src="imgSrc"
          :state="displayImage"
        />
      </div>
      <pre v-show="displayText">{{ page ? page.content : '' }}</pre>
    </div>
  </div>
</template>

<script>
import _ from 'lodash'

import settings from '@/settings.js'
import common from '@/mixins/common.js'
import MonImg from '@/components/mongol/MonImg'
import MonButton from '@/components/mongol/MonButton'

export default {
  head() {
    return {
      title: 'A Book Page'
    }
  },
  components: {
    MonImg,
    MonButton
  },
  mixins: [common],
  data: function() {
    return {
      // cmounted: after page rendered flag, make sure run on browser
      page: this.$store.getters['page/getPage'](this.$store.state.page.PageId),
      cmounted: false,
      displayText: true,
      displayImage: false
    }
  },
  computed: {
    imgSrc() {
      if (!this.page) {
        return ''
      }
      const type = this.page.imageType
      if (this.cmounted && type) {
        return `/${settings.images}/${settings.book}/${this.page.book.id}/${this.page.id}.${type}`
      }
      return ''
    }
  },
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
  },
  mounted() {
    // display image after content mounted
    this.cmounted = true
  },
  updated() {
    this.cmounted = true
  },
  methods: {
    toggle(state) {
      this.displayText = true
      this.displayImage = false
      if (state === 1) {
        this.displayText = false
        this.displayImage = true
      }
      if (state === 2) {
        this.displayText = true
        this.displayImage = true
      }
    },
    getPageURLid(pageid) {
      const order = _.findIndex(this.book.pages, function(o) {
        return o.id === pageid
      })
      return order + 1
    }
  }
}
</script>

<style scoped>
.types {
  display: flex;
  justify-content: center;
  align-items: center;
  margin-bottom: 1rem;
}
.item {
  margin: 0 1rem 1rem 1rem;
}
.img-container {
  display: flex;
  justify-content: center;
  margin: 0;
  margin-top: 2rem;
  margin-bottom: 2rem;
  padding: 0;
}
</style>
