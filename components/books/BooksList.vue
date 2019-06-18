<template>
  <div class="book-list">
    <h1>
      <nuxt-link :to="bookLink + '/1'">  1</nuxt-link>
    </h1>
    <div class="preview">
      <span>
                  
                  
         19     
      </span>
    </div>
    <hr />
    <h1>
      <nuxt-link :to="bookLink + '/2'">  2</nuxt-link>
    </h1>
    <div class="preview">
      <span>
                  
                  
         19     
      </span>
    </div>
    <hr />
    <h1>
      <nuxt-link :to="bookLink + '/3'">  3</nuxt-link>
    </h1>
    <div class="preview">
      <span>
                  
                  
         19     
      </span>
    </div>
    <hr />
    <h1>
      <nuxt-link :to="bookLink + '/4'">  4</nuxt-link>
    </h1>
    <div class="preview">
      <span>
                  
                  
         19     
      </span>
    </div>
    <no-ssr>
      <div class="pages-number">
        <span v-if="!isFirstPage" class="pre">
          <nuxt-link :to="path + '?page=' + prePage">《</nuxt-link>
        </span>
        <span v-for="num in pagesCount" :key="num" class="number">
          <template v-if="pageID !== pageNum(num)">
            <nuxt-link :to="path + '?page=' + pageNum(num)">
              {{ pageNum(num) }}
            </nuxt-link>
          </template>

          <template v-if="pageID === pageNum(num)">{{ pageNum(num) }}</template>
        </span>
        <span v-if="!isLastPage" class="next">
          <nuxt-link :to="path + '?page=' + nextPage">》ᠬᠤᠢᠢᠨᠠᠬᠢ</nuxt-link>
        </span>
      </div>
    </no-ssr>
  </div>
</template>

<script>
export default {
  data() {
    return {
      totalPages: 20,
      pagesCount: 10,
      booksPerPage: 10,
      pageID: 1,
      path: '/'
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
    startPage() {
      let num = 0
      if (this.pageID > 6) {
        num = this.pageID - 6
      }
      if (num + this.pagesCount > this.totalPages) {
        num = this.totalPages - this.pagesCount
      }
      return num
    },
    prePage() {
      return this.pageID - 1
    },
    nextPage() {
      return this.pageID + 1
    },
    isFirstPage() {
      return this.pageID === 1
    },
    isLastPage() {
      return this.totalPages <= this.pageID
    }
  },
  watch: {
    $route(to, from) {
      this.init()
    }
  },
  beforeCreate() {
    const p = parseInt(this.$route.query.page)
    if (p > this.totalPages || p < 1) {
      this.$router.push('/')
    }
  },
  beforeMount() {
    this.init()
  },
  methods: {
    init() {
      this.path = this.$route.path
      let id = this.$route.query.page
      if (!id) {
        id = 1
      }
      this.pageID = parseInt(id)
    },
    pageNum(num) {
      return this.startPage + parseInt(num)
    }
  }
}
</script>

<style scoped>
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
