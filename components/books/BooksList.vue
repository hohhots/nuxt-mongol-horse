<template>
  <div class="book-list">
    <no-ssr>
      <div v-for="book in books" :key="book.id" class="book">
        <h1>
          <nuxt-link :to="bookLink + '/' + book.id">{{ book.title }}</nuxt-link>
        </h1>
        <div class="preview">
          <span>{{ book.preview }}</span>
        </div>
      </div>
      <pages-number />
      <div class="pages-number">
        <span v-if="!isFirstPage()" class="pre">
          <nuxt-link :to="basePath + '?page=' + prePage()">《</nuxt-link>
        </span>
        <span
          v-for="num in selectablePagesNum"
          :key="num"
          :class="{ number: pageExist(num) }"
        >
          <template v-if="!isCurrentPage(num) && pageExist(num)">
            <nuxt-link :to="basePath + '?page=' + pageNum(num)">{{
              pageNum(num)
            }}</nuxt-link>
          </template>

          <template v-if="isCurrentPage(num) && pageExist(num)">{{
            pageNum(num)
          }}</template>
        </span>
        <span v-if="!isLastPage()" class="next">
          <nuxt-link :to="basePath + '?page=' + nextPage()"
            >》ᠬᠤᠢᠢᠨᠠᠬᠢ</nuxt-link
          >
        </span>
      </div>
    </no-ssr>
  </div>
</template>

<script>
import PagesNumber from '@/components/common/PagesNumber'

export default {
  components: {
    PagesNumber
  },
  data() {
    return {
      totalItems: 131,
      itemsPerPage: 10,
      firstPageId: 1,
      selectablePagesNum: 10,
      pageID: 1,
      basePath: '/',
      books: [
        {
          id: 1,
          title: '  1',
          preview:
            '                       19     '
        },
        {
          id: 2,
          title: '  2',
          preview:
            '                       19     '
        },
        {
          id: 3,
          title: '  3',
          preview:
            '                       19     '
        },
        {
          id: 4,
          title: '  4',
          preview:
            '                       19     '
        },
        {
          id: 5,
          title: '  5',
          preview:
            '                       19     '
        },
        {
          id: 6,
          title: '  6',
          preview:
            '                       19     '
        },
        {
          id: 7,
          title: '  7',
          preview:
            '                       19     '
        },
        {
          id: 8,
          title: '  8',
          preview:
            '                       19     '
        },
        {
          id: 9,
          title: '  9',
          preview:
            '                       19     '
        },
        {
          id: 10,
          title: '  10',
          preview:
            '                       19     '
        }
      ]
    }
  },
  computed: {
    bookLink() {
      let path = '/book'
      if (this.$route.path.indexOf('/admin') > -1) {
        path = '/admin'
      }
      return path
    },
    totalPages() {
      return Math.ceil(this.totalItems / this.itemsPerPage)
    },
    startPage() {
      let num = 0
      if (this.pageID > 6) {
        num = this.pageID - 6
      }
      if (num + this.selectablePagesNum > this.totalPages) {
        num = this.totalPages - this.selectablePagesNum
      }
      return num
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
      if (p > this.totalPages || p < 1) {
        this.$router.push(this.$route.path)
        return
      }
      this.basePath = this.$route.path
      this.pageID = p || 1
    },
    pageNum(num) {
      return this.startPage + parseInt(num)
    },
    isCurrentPage(num) {
      return this.pageID === this.pageNum(num)
    },
    pageExist(num) {
      return num >= 1 - this.startPage
    },
    prePage() {
      return this.pageID - 1
    },
    nextPage() {
      return this.pageID + 1
    },
    isFirstPage() {
      return this.pageID === this.firstPageId
    },
    isLastPage() {
      return this.totalPages <= this.pageID
    }
  }
}
</script>

<style scoped>
.book {
  margin-bottom: 30px;
  border-bottom: 1px solid #cfcfcf;
  padding-top: 10px;
  padding-bottom: 10px;
}
.pages-number {
  margin-top: 3rem;
  display: flex;
  justify-content: center;
  align-items: center;
  height: 3rem;
}
.number,
.pre,
.next {
  font-size: 1.2rem;
  margin-left: 1rem;
}
.pre {
  margin-right: 2rem;
}
.next {
  margin-left: 2rem;
}
</style>
