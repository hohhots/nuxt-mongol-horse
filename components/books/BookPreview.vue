<template>
  <div class="container">
    <div class="item">
      <div class="title">{{ monText.bookTitle }}᠄</div>
      <div class="content">{{ book.title }}</div>
    </div>
    <div class="item">
      <div class="title">{{ monText.author }}᠄</div>
      <div class="content">{{ book.author }}</div>
    </div>
    <div class="item">
      <div class="title">{{ monText.writtenDate }}᠄</div>
      <div class="content">{{ book.writtenDate }}</div>
    </div>
    <div class="item">
      <div class="title">{{ monText.allPagesCount }}᠄</div>
      <div class="content">{{ book.content.length }}</div>
    </div>
    <div class="item">
      <div class="title">{{ monText.typers }}᠄</div>
      <div class="content">{{ book.typers }}</div>
    </div>
    <div class="item">
      <div class="title">{{ monText.preview }}᠄</div>
      <div class="content">{{ book.preview }}</div>
    </div>
  </div>
</template>

<script>
import gv from '@/mixins/globalVariables.js'

export default {
  mixins: [gv],
  props: {
    book: {
      type: Object,
      default: () => {}
    }
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
