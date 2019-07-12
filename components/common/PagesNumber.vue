<template>
  <div class="pages-number">
    <span v-if="!isFirstPage()" class="pre">
      <nuxt-link :to="basePath + prePage()">《</nuxt-link>
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
    }
  },
  computed: {
    totalPages() {
      return Math.ceil(this.itemsCount / this.itemsPerpage)
    },
    startPage() {
      let num = 0
      if (this.pageId > 6) {
        num = this.pageId - 6
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
  margin-top: 2rem;
  margin-bottom: 2rem;
  display: flex;
  justify-content: center;
  align-items: center;
  height: 3rem;
}

.num,
.num-only,
.number,
.pre,
.next {
  cursor: pointer;
  font-size: 1.2rem;
  margin-left: 0.7rem;
}

.pre {
  margin-left: 0;
}

.num:hover {
  text-decoration: overline;
}

.num-only {
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: default;
  color: black;
}

.num-only:after {
  position: absolute;
  content: ' ';
  right: -1.5rem;
  border: 2px solid red;
  border-radius: 50%;
  width: 10px;
  height: 10px;
}
</style>
