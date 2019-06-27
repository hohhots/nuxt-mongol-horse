export default {
  data() {
    return {
      bookUrl: '/book',
      adminUrl: '/admin'
    }
  },
  computed: {
    baseUrl() {
      const b = this.bookUrl
      const a = this.adminUrl
      const path = this.$route.path
      const secondSlash = path.substring(1).indexOf('/')
      if (path === a) {
        return a
      } else if (secondSlash > -1 && path.substring(0, secondSlash + 1) === a) {
        return a
      }
      return b
    }
  }
}
