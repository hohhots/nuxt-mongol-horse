<template>
  <div class="container">
    <div class="types">
      <mon-button class="item" width="70px" @click="toggle(0)">{{
        monText.text
      }}</mon-button>
      <mon-button class="item" width="70px" @click="toggle(1)">{{
        monText.photo
      }}</mon-button>
      <mon-button class="item" width="70px" @click="toggle(2)">{{
        monText.together
      }}</mon-button>
    </div>
    <div class="content">
      <div class="img-container">
        <mon-img
          v-show="displayImage && imgSrc"
          :src="imgSrc"
          :state="displayImage"
        />
      </div>
      <pre v-show="displayText">{{ page ? page.content : '' }}</pre>
    </div>
  </div>
</template>

<script>
import settings from '@/settings.js'
import common from '@/mixins/common.js'
import MonImg from '@/components/mongol/MonImg'
import MonButton from '@/components/mongol/MonButton'

export default {
  components: {
    MonImg,
    MonButton
  },
  mixins: [common],
  data: function() {
    return {
      // cmounted: after page rendered flag, make sure run on browser
      cmounted: false,
      displayText: true,
      displayImage: false
    }
  },
  computed: {
    imgSrc() {
      if (!this.page) {
        return ''
      }
      const type = this.page.imageType
      if (this.cmounted && type) {
        return `/${settings.images}/${settings.book}/${this.page.book.id}/${this.page.id}.${type}`
      }
      return ''
    }
  },
  async asyncData({ store, params }) {
    await store.dispatch('books/fetchPage', params.pageid)
    return { page: store.getters['books/getPage'] }
  },
  mounted() {
    // display image after content mounted
    this.cmounted = true
  },
  updated() {
    this.cmounted = true
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
    }
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
  margin-bottom: 2rem;
  padding: 0;
  width: 100%;
  height: 100%;
}
</style>
