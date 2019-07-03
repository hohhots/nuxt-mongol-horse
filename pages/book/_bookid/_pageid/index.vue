<template>
  <div class="container">
    <div class="types">
      <mon-button class="item" width="70px" @click="toggle(0)"
        >ᠦᠰᠦᠭᠯᠡᠯ</mon-button
      >
      <mon-button class="item" width="70px" @click="toggle(1)"
        >ᠵᠢᠷᠤᠬᠯᠠᠯ</mon-button
      >
      <mon-button class="item" width="70px" @click="toggle(2)"
        ></mon-button
      >
    </div>
    <div class="content">
      <span v-show="displayText">{{ book.content[pageId - 1].content }}</span>
      <div class="img-container">
        <mon-img v-show="displayImage" :src="imgSrc" :state="displayImage" />
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'

import MonImg from '@/components/mongol/MonImg'
import MonButton from '@/components/mongol/MonButton'

export default {
  components: {
    MonImg,
    MonButton
  },
  data: function() {
    return {
      displayText: true,
      displayImage: false,
      pageId: this.$route.params.pageid
    }
  },
  computed: {
    book() {
      return this.getBook()(this.$route.params.bookid)
    },
    imgSrc() {
      return this.book.content[this.pageId - 1].image
    }
  },
  methods: {
    toggle(state) {
      this.displayText = true
      this.displayImage = false
      if (state === 1) {
        this.displayText = false
        this.displayImage = true
      }
      if (state === 2) {
        this.displayText = true
        this.displayImage = true
      }
    },
    ...mapGetters({
      getBook: 'books/getBook'
    })
  }
}
</script>

<style scoped>
.types {
  display: flex;
  justify-content: center;
  align-items: center;
  margin-bottom: 1rem;
}
.item {
  margin: 0 1rem 1rem 1rem;
}
.img-container {
  display: flex;
  justify-content: center;
  margin: 0;
  margin-top: 2rem;
  padding: 0;
  width: 100%;
  height: 100%;
}
</style>
