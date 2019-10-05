import settings from '@/settings.js'

export default {
  data() {
    return {
      monText: settings.monText
    }
  },
  computed: {
    baseUrl() {
      const b = '/' + settings.book
      const a = '/' + settings.admin
      const path = this.$route.path
      const secondSlash = path.substring(1).indexOf('/')
      if (path === a) {
        return a
      } else if (secondSlash > -1 && path.substring(0, secondSlash + 1) === a) {
        return a
      }
      return b
    },
    editExistingPage() {
      const bookid = this.$route.params.bookid
      const pageid = this.$route.params.pageid
      let newpage = false
      if (this.$route.path.indexOf(settings.newPage) > -1) {
        newpage = true
      }
      if ((bookid && !pageid) || (pageid && !newpage)) {
        return true
      }
      return false
    }
  }
}