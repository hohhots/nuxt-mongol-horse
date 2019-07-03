<template>
  <div class="container">
    <div class="item">
      <div class="title">᠄</div>
      <div class="content">{{ book.title }}</div>
    </div>
    <div class="item">
      <div class="title">᠄</div>
      <div class="content">{{ book.author }}</div>
    </div>
    <div class="item">
      <div class="title">᠄</div>
      <div class="content">{{ book.writtenDate }}</div>
    </div>
    <div class="item">
      <div class="title">ᠨᠡᠶᠢᠲᠡ᠄</div>
      <div class="content">{{ book.content.length }}</div>
    </div>
    <div class="item">
      <div class="title">᠄</div>
      <div class="content">{{ book.typers }}</div>
    </div>
    <div class="item">
      <div class="title">᠄</div>
      <div class="content">{{ book.preview }}</div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  computed: {
    book() {
      return this.getBook()(this.$route.params.bookid)
    }
  },
  methods: {
    ...mapGetters({
      getBook: 'books/getBook'
    })
  }
}
</script>

<style scoped>
.item {
  margin-bottom: 1.5rem;
  width: 100%;
}

.title,
.content {
  display: inline-block;
  line-height: 2rem;
}

.title {
  float: left;
  margin-right: 3rem;
}
</style>
