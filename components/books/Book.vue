<template>
  <div>
    <div class="title">
      <nuxt-link :to="bookLink">
        <h1>{{ book.title }}</h1>
      </nuxt-link>
    </div>
    <pages-number
      :items-count="totalPages"
      :page-id="parseInt(getPageURLid(this.$route.params.pageid))"
      :base-path="basePath()"
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
    bookLink() {
      return this.baseUrl + '/' + this.$route.params.bookid
    }
  },
  watch: {
    $route(to, from) {
      this.redirect()
    }
  },
  beforeMount() {
    this.redirect()
  },
  methods: {
    redirect() {
      const pageid = this.$route.params.pageid
      if (
        pageid &&
        // edit existing page
        !this.getPageURLid(pageid)
      ) {
        this.$router.push(this.baseUrl + '/' + this.$route.params.bookid)
      }
    },
    // get base bookid url: /book/23sdff34/3 to /book/23sdff34/
    basePath() {
      const path = this.$route.path.split('/')
      return '/' + path[1] + '/' + path[2] + '/'
    },
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
