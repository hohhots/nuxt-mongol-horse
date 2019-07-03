<template>
  <div class="book-list">
    <no-ssr>
      <div v-for="book in books" :key="book.id" class="book">
        <h3>
          <nuxt-link :to="baseUrl + '/' + book.id">{{ book.title }}</nuxt-link>
        </h3>
        <div class="preview">
          <span>{{ book.preview }}</span>
        </div>
      </div>
      <pages-number
        :items-count="totalItems"
        :items-perpage="itemsPerPage"
        :page-id="parseInt(this.$route.query.page) || firstPageId"
        :base-path="pagenumUrl()"
      />
    </no-ssr>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'

import gVariables from '@/mixins/globalVariables.js'
import PagesNumber from '@/components/common/PagesNumber'

export default {
  components: {
    PagesNumber
  },
  mixins: [gVariables],
  data() {
    return {
      totalItems: 131,
      itemsPerPage: 10,
      firstPageId: 1
    }
  },
  computed: {
    totalPages() {
      return Math.ceil(this.totalItems / this.itemsPerPage)
    },
    books() {
      return this.getBooksPreview()(this.$route.query.page)
    }
  },
  watch: {
    $route(to, from) {
      this.init()
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
      if (bu === this.bookUrl) {
        return p
      }
      if (bu === this.adminUrl) {
        return bu + p
      }
    },
    ...mapGetters({
      getBooksPreview: 'books/getBooksPreview'
    })
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
