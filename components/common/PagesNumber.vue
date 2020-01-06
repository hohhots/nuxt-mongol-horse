<template>
  <div class="pages-number">
    <span v-if="!isFirstPage()" class="first">
      <nuxt-link :to="basePath + getPageId(firstPageId)">
        <mon-horizon class="num">{{ firstPageId }}</mon-horizon>
      </nuxt-link>
    </span>
    <span v-if="!isFirstPages()" class="pre">
      <nuxt-link :to="basePath + getPageId(prePages())">《</nuxt-link>
    </span>
    <span
      v-for="num in displayPagesRange"
      :key="num"
      :class="{ number: pageExist(num) }"
    >
      <template v-if="!isCurrentPage(num) && pageExist(num)">
        <nuxt-link :to="basePath + getPageId(pageNum(num))">
          <mon-horizon class="num">{{ pageNum(num) }}</mon-horizon>
        </nuxt-link>
      </template>

      <template v-if="isCurrentPage(num) && pageExist(num)">
        <mon-horizon class="num-only">{{ pageNum(num) }}</mon-horizon>
      </template>
    </span>
    <span v-if="!isLastPages()" class="next">
      <nuxt-link :to="basePath + getPageId(nextPages())">》</nuxt-link>
    </span>
    <span v-if="!isLastPage()" class="last">
      <nuxt-link :to="basePath + getPageId(totalPages)">
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
    pages: {
      type: Array,
      default: () => {
        return []
      }
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
      return this.startPage <= this.firstPageId
    },
    isLastPages() {
      return this.startPage + this.displayPagesRange >= this.totalPages - 1
    },
    prePages() {
      const pre =
        this.startPage - (this.displayPagesRange - this.currentPagePosition)
      if (pre > 0) {
        return pre
      } else {
        return this.firstPageId
      }
    },
    nextPages() {
      const next =
        this.startPage + this.displayPagesRange + this.currentPagePosition
      if (next < this.totalPages) {
        return next
      } else {
        return this.totalPages
      }
    },
    getPageId(urlId) {
      if (this.pages.length > 0) {
        return this.pages[urlId - 1].id
      }
      return urlId
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
.first,
.pre,
.next,
.last {
  cursor: pointer;
  font-size: 1.2rem;
  margin-left: 0.3rem;
  margin-right: 0.3rem;
}

.first,
.pre {
  margin-left: 0;
}

.first,
.last {
  font-weight: bold;
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
