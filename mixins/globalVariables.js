export default {
  data() {
    return {
      bookUrl: '/book',
      adminUrl: '/admin',
      newPage: 'new-page',
      monText: {
        newBook: '',
        newPage: '',
        bookTitle: '',
        author: '',
        writtenDate: '',
        allPagesCount: 'ᠨᠡᠶᠢᠲᠡ',
        typers: '',
        preview: '',
        content: '',
        save: '',
        cancel: '',
        prePage: '',
        nextPage: 'ᠬᠤᠢᠢᠨᠠᠬᠢ',
        text: 'ᠦᠰᠦᠭᠯᠡᠯ',
        photo: 'ᠵᠢᠷᠤᠬᠯᠠᠯ',
        together: '',
        company:
          'ᠦᠪᠦᠷ ᠮᠤᠩᠭ᠋ᠤᠯ ᠤᠨ ᠮᠤᠩᠭᠤᠯ ᠮᠤᠷᠢ ᠡᠷᠡᠬᠦᠯ ᠮᠡᠨᠳᠤ ᠶᠢᠨ    ',
        contact: 'ᠬᠣᠯᠪᠤᠭ᠎ᠠ ᠄ 086-13804749201'
      }
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
    },
    editExistingPage() {
      const bookid = this.$route.params.bookid
      const pageid = this.$route.params.pageid
      let newpage = false
      if (this.$route.path.indexOf(this.newPage) > -1) {
        newpage = true
      }
      if ((bookid && !pageid) || (pageid && !newpage)) {
        return true
      }
      return false
    }
  }
}
