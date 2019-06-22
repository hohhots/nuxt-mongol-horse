<template>
  <div class="pages-number">
    <span v-if="!isFirstPage()" class="pre">
      <nuxt-link :to="basePath + prePage()">《</nuxt-link>
    </span>
    <span
      v-for="num in selectablePagesNum"
      :key="num"
      :class="{ number: pageExist(num) }"
    >
      <template v-if="!isCurrentPage(num) && pageExist(num)">
        <nuxt-link :to="basePath + pageNum(num)">
          <span class="num">{{ pageNum(num) }}</span>
        </nuxt-link>
      </template>

      <template v-if="isCurrentPage(num) && pageExist(num)">{{
        pageNum(num)
      }}</template>
    </span>
    <span v-if="!isLastPage()" class="next">
      <nuxt-link :to="basePath + nextPage()">》ᠬᠤᠢᠢᠨᠠᠬᠢ</nuxt-link>
    </span>
  </div>
</template>

<script>
export default {
  props: {
    itemsCount: {
      type: Number,
      default: 0
    },
    itemsPerPage: {
      type: Number,
      default: 1
    },
    pageId: {
      type: Number,
      default: 0
    },
    basePath: {
      type: String,
      default: ''
    },
    firstPageId: {
      type: Number,
      default: 1
    },
    selectablePagesNum: {
      type: Number,
      default: 10
    }
  },
  computed: {
    totalPages() {
      return Math.ceil(this.itemsCount / this.itemsPerPage)
    },
    startPage() {
      let num = 0
      if (this.pageId > 6) {
        num = this.pageId - 6
      }
      if (num + this.selectablePagesNum > this.totalPages) {
        num = this.totalPages - this.selectablePagesNum
      }
      return num
    }
  },
  methods: {
    pageNum(num) {
      return this.startPage + parseInt(num)
    },
    isCurrentPage(num) {
      return this.pageId === this.pageNum(num)
    },
    pageExist(num) {
      return num >= 1 - this.startPage
    },
    isFirstPage() {
      return this.pageId <= this.firstPageId
    },
    isLastPage() {
      return this.totalPages === this.pageId
    },
    prePage() {
      return this.pageId - 1
    },
    nextPage() {
      return this.pageId + 1
    }
  }
}
</script>

<style scoped>
.pages-number {
  margin-top: 3rem;
  margin-bottom: 2rem;
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
