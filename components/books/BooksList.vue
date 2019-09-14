<template>
  <div class="book-list">
    <div v-for="book in books" :key="book.id" class="book">
      <h3>
        <nuxt-link :to="baseUrl + '/' + book.id">{{ book.title }}</nuxt-link>
      </h3>
      <div class="preview">
        <pre>{{ book.preview }}</pre>
      </div>
    </div>
    <pages-number
      :items-count="totalBooks"
      :items-perpage="itemsPerPage"
      :page-id="parseInt(this.$route.query.page) || firstPageId"
      :base-path="pagenumUrl()"
    />
  </div>
</template>

<script>
import { mapGetters } from 'vuex'

import settings from '@/settings.js'
import gv from '@/mixins/common.js'

import PagesNumber from '@/components/common/PagesNumber'

export default {
  components: {
    PagesNumber
  },
  mixins: [gv],
  props: {
    books: {
      type: Array,
      default: () => {}
    }
  },
  data() {
    return {
      itemsPerPage: settings.itemsPerPage,
      firstPageId: 1
    }
  },
  computed: {
    ...mapGetters({
      totalBooks: 'books/getBooksNum'
    }),
    totalPages() {
      return Math.ceil(this.totalBooks / settings.itemsPerPage)
    }
  },
  beforeMount() {
    this.init()
  },
  methods: {
    init() {
      const p = parseInt(this.$route.query.page)
      if ((p && p > this.totalPages) || p < 1) {
        this.$router.push(this.$route.path)
      }
    },
    pagenumUrl() {
      const p = '/?page='
      const bu = this.baseUrl
      if (bu === '/' + settings.book) {
        return p
      }
      if (bu === '/' + settings.admin) {
        return bu + p
      }
    }
  }
}
</script>

<style scoped>
h3 {
  padding: 5px 0 5px 0;
  font-weight: normal;
}

.book {
  margin-top: 0;
  margin-bottom: 26px;
}
.preview {
  line-height: 2rem;
  text-align: left;
}
</style>
