<template>
  <div class="pages-number">
    <span v-if="!isFirstPage()" class="pre">
      <nuxt-link :to="basePath + firstPageId">
        <mon-horizon class="num">{{ firstPageId }}</mon-horizon>
      </nuxt-link>
    </span>
    <span v-if="!isFirstPages()" class="pre">
      <nuxt-link :to="basePath + prePages()">《</nuxt-link>
    </span>
    <span
      v-for="num in displayPagesRange"
      :key="num"
      :class="{ number: pageExist(num) }"
    >
      <template v-if="!isCurrentPage(num) && pageExist(num)">
        <nuxt-link :to="basePath + pageNum(num)">
          <mon-horizon class="num">{{ pageNum(num) }}</mon-horizon>
        </nuxt-link>
      </template>

      <template v-if="isCurrentPage(num) && pageExist(num)">
        <mon-horizon class="num-only">{{ pageNum(num) }}</mon-horizon>
      </template>
    </span>
    <span v-if="!isLastPages()" class="next">
      <nuxt-link :to="basePath + nextPages()">》</nuxt-link>
    </span>
    <span v-if="!isLastPage()" class="next">
      <nuxt-link :to="basePath + totalPages">
        <mon-horizon class="num">{{ totalPages }}</mon-horizon>
      </nuxt-link>
    </span>
  </div>
</template>

<script>
import gv from '@/mixins/common.js'

export default {
  mixins: [gv],
  props: {
    itemsCount: {
      type: Number,
      default: 0
    },
    itemsPerpage: {
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
    displayPagesRange: {
      type: Number,
      default: 10
    },
    currentPagePosition: {
      type: Number,
      default: 6
    }
  },
  computed: {
    totalPages() {
      return Math.ceil(this.itemsCount / this.itemsPerpage)
    },
    startPage() {
      let num = 0
      if (this.pageId > this.currentPagePosition) {
        num = this.pageId - this.currentPagePosition
      }
      if (num + this.displayPagesRange > this.totalPages) {
        num = this.totalPages - this.displayPagesRange
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
      // startPage start from -9
      return this.firstPageId > this.startPage
    },
    isLastPage() {
      // startPage start from -9
      return this.totalPages === this.startPage + this.displayPagesRange
    },
    isFirstPages() {
      // startPage start from -9
      return this.firstPageId - 1 > this.startPage - this.displayPagesRange
    },
    isLastPages() {
      // startPage start from -9
      return this.totalPages < this.startPage + 2 * this.displayPagesRange
    },
    prePages() {
      return (
        this.startPage - (this.displayPagesRange - this.currentPagePosition) ||
        this.firstPageId
      )
    },
    nextPages() {
      return this.startPage + this.displayPagesRange + this.currentPagePosition
    }
  }
}
</script>

<style scoped>
.pages-number {
  margin-top: 2rem;
  margin-bottom: 2rem;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-wrap: wrap;
  height: 3rem;
}

.num,
.num-only,
.number,
.pre,
.next {
  cursor: pointer;
  font-size: 1.2rem;
  margin-left: 0.3rem;
  margin-right: 0.3rem;
}

.pre {
  margin-left: 0;
}

.num-only {
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: default;
  color: black;
}

.num:hover:after,
.num-only:after {
  position: absolute;
  content: ' ';
  right: -1.5rem;
  border: 2px solid red;
  border-radius: 50%;
  width: 10px;
  height: 10px;
}

.num:hover:after {
  top: 0.3rem;
  border: 2px solid #666;
}
</style>
