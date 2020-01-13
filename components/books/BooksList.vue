<template>
  <div class="book-list">
    <div v-if="books.length === 0">
      {{ empty }}
    </div>
    <div v-for="book in books" :key="book.id" class="book">
      <h3>
        <span>
          <a :href="bookUrl + book.id" target="_blank">
            {{ book.title }}
          </a>
        </span>
      </h3>
      <div class="preview">
        <pre>{{ book.preview }}</pre>
      </div>
      <span
        v-if="search"
        v-for="(page, index) in book.pages"
        :key="page.id"
        class="page"
      >
        <a :href="bookUrl + book.id + '/' + page.id" target="_blank">
          <mon-horizon class="pagelink">{{ index + 1 }}</mon-horizon>
        </a>
      </span>
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
import { mapState, mapGetters } from 'vuex'

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
      // books display start from first page 1
      firstPageId: 1,
      empty: settings.monText.emptyFilter
    }
  },
  computed: {
    ...mapState({
      totalBooks: state => state.book.TotalBooks
    }),
    ...mapGetters({
      loggedIn: 'user/loggedIn'
    }),
    totalPages() {
      return Math.ceil(this.totalBooks / settings.itemsPerPage)
    },
    search() {
      return this.$route.query.search
    },
    bookUrl() {
      let url = this.baseUrl
      if (url === '/') {
        url += settings.book
      }
      return url + '/'
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
      const bu = this.baseUrl

      const s = this.$route.query.search
      let p = '/?'
      if (s) {
        p += 'search=' + s + '&page='
      } else {
        p += 'page='
      }

      if (bu === '/' || bu === '/' + settings.book) {
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
.search {
  position: relative;
  cursor: default;
  color: black;
}
.page,
.pagelink {
  position: relative;
  cursor: pointer;
  font-size: 1.2rem;
  margin-left: 0.3rem;
  margin-right: 0.3rem;
  width: 1rem;
}
.page {
  background-color: rgba(196, 190, 157, 1);
  border: 1px solid rgba(196, 190, 157, 1);
  height: 1rem;
}
.page:hover {
  background-color: rgba(226, 220, 187, 1);
}
.pagelink {
  display: inline-table;
  text-align: center;
}
</style>
