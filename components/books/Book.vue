<template>
  <div>
    <div class="title">
      <nuxt-link :to="bookUrl">
        <h1>{{ book.title }}</h1>
      </nuxt-link>
    </div>
    <pages-number
      :items-count="totalPages"
      :page-id="parseInt(getPageURLid(this.$route.params.pageid))"
      :base-path="pageUrl"
      :pages="book.pages"
    />
  </div>
</template>

<script>
import _ from 'lodash'

import common from '@/mixins/common.js'
import PagesNumber from '@/components/common/PagesNumber'

export default {
  components: {
    PagesNumber
  },
  mixins: [common],
  props: {
    book: {
      type: Object,
      default: () => {}
    }
  },
  computed: {
    totalPages: {
      cache: false,
      get: function() {
        return this.book.pages.length
      }
    },
    pageUrl() {
      return this.baseUrl + '/' + this.$route.params.bookid + '/'
    },
    bookUrl() {
      return this.baseUrl + '/' + this.$route.params.bookid
    }
  },
  methods: {
    // convert page hash id to order number
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
.title {
  margin-top: 20px;
  margin-bottom: 20px;
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>
