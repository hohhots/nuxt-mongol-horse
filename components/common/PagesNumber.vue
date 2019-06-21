<template>
  <div class="pages-number">
    <span v-if="!isFirstPage" class="pre">
      <nuxt-link :to="bookLink + '/' + prePage">《</nuxt-link>
    </span>
    <span
      v-for="num in pagesCountInPerPage"
      :key="num"
      :class="{ number: pageExist(num) }"
    >
      <template v-if="!isCurrentPage(num) && pageExist(num)">
        <nuxt-link :to="bookLink + '/' + pageNum(num)">
          <span class="num">{{ pageNum(num) }}</span>
        </nuxt-link>
      </template>

      <template v-if="isCurrentPage(num) && pageExist(num)">
        {{ pageNum(num) }}
      </template>
    </span>
    <span v-if="!isLastPage" class="next">
      <nuxt-link :to="bookLink + '/' + nextPage">》ᠬᠤᠢᠢᠨᠠᠬᠢ</nuxt-link>
    </span>
  </div>
</template>

<script>
export default {
  props: {
    pagesCountInPerPage: {
      type: Number,
      default: 10
    },
    totalPages: {
      type: Number,
      default: 12
    }
  },
  data() {
    return {
      path: '',
      bookid: '',
      pageID: 1
    }
  },
  computed: {
    bookLink() {
      const path = this.$route.path
      const last = path.substring(1).indexOf('/') + 1
      const root = path.substring(0, last)

      if (this.bookid) {
        return root + '/' + this.bookid
      } else {
        return root
      }
    },
    isFirstPage() {
      console.log(this.pageID)
      return this.pageID === 1
    },
    isLastPage() {
      return this.totalPages <= this.pageID
    },
    prePage() {
      return this.pageID - 1
    },
    nextPage() {
      return this.pageID + 1
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
      this.path = this.$route.path
      this.bookid = this.$route.params.bookid
      this.pageID = parseInt(this.$route.params.pageid) || 1
    },
    startPage() {
      let num = 0
      if (this.pageID > 6) {
        num = this.pageID - 6
      }
      if (num + this.pagesCountInPerPage > this.totalPages) {
        num = this.totalPages - this.pagesCountInPerPage
      }
      return num
    },
    pageNum(num) {
      return this.startPage + parseInt(num)
    },
    isCurrentPage(num) {
      return this.pageID === this.pageNum(num)
    },
    pageExist(num) {
      return num >= 1 - this.startPage
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
