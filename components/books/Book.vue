<template>
  <div>
    <div class="title">
      <nuxt-link :to="bookLink">
        <h1>{{ book.title }}</h1>
      </nuxt-link>
    </div>
    <pages-number
      :items-count="totalPages"
      :page-id="parseInt(this.$route.params.pageid) || firstPageId"
      :base-path="basePath()"
    />
  </div>
</template>

<script>
import common from '@/mixins/common.js'
import PagesNumber from '@/components/common/PagesNumber'

export default {
  components: {
    PagesNumber
  },
  mixins: [common],
  props: {
    book: {
      type: Object,
      default: () => {}
    }
  },
  data() {
    return {
      firstPageId: 0
    }
  },
  computed: {
    totalPages() {
      return this.book.pages.length
    },
    bookLink() {
      return this.baseUrl + '/' + this.$route.params.bookid
    }
  },
  watch: {
    $route(to, from) {
      this.redirect()
    }
  },
  beforeMount() {
    this.redirect()
  },
  methods: {
    redirect() {
      const pageid = this.$route.params.pageid
      if (
        pageid &&
        // edit existing page
        ((parseInt(pageid) > this.totalPages && this.editExistingPage) ||
          // add new page
          (parseInt(pageid) > this.totalPages + 1 && !this.editExistingPage) ||
          parseInt(pageid) < 1)
      ) {
        this.$router.push(this.baseUrl + '/' + this.$route.params.bookid)
      }
    },
    basePath() {
      const path = this.$route.path
      const last = path.substring(1).indexOf('/') + 2
      return path.substring(0, last) + this.$route.params.bookid + '/'
    }
  }
}
</script>

<style scoped>
.title {
  margin-top: 20px;
  margin-bottom: 20px;
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>
