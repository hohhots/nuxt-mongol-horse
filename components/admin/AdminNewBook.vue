<template>
  <form @submit.prevent="onSubmit">
    <MonInputControl
      v-model.trim="newBook.title"
      :placeholder="monText.bookTitle"
      >{{ monText.bookTitle }}᠄</MonInputControl
    >

    <MonInputControl v-model.trim="newBook.author" :placeholder="monText.author"
      >{{ monText.author }}᠄</MonInputControl
    >

    <MonInputControl
      v-model.trim="newBook.publishedAt"
      :placeholder="monText.publishedAt"
      >{{ monText.publishedAt }}᠄</MonInputControl
    >

    <MonInputControl
      v-model="newBook.preview"
      :placeholder="monText.preview"
      control-type="textarea"
      >{{ monText.preview }}᠄</MonInputControl
    >

    <AdminSaveCancel @cancel="onCancel" @newPage="onNewPage"></AdminSaveCancel>
  </form>
</template>

<script>
import { mapState } from 'vuex'

import settings from '@/settings.js'
import gVariables from '@/mixins/common.js'
import AdminSaveCancel from '@/components/admin/AdminSaveCancel'

export default {
  components: {
    AdminSaveCancel
  },
  mixins: [gVariables],
  props: {
    book: {
      type: Object,
      default: () => {}
    }
  },
  data() {
    return {
      newBook: {}
    }
  },
  computed: {
    ...mapState({
      jwt: state => state.user.jwt,
      newBookId: state => state.book.BookId
    }),
    bookid() {
      return this.$route.params.bookid
    },
    pageid() {
      return this.$route.params.pageid
    }
  },
  beforeMount() {
    this.init()
  },
  methods: {
    init() {
      this.newBook = { ...this.book }
    },
    async onSubmit() {
      const ask = confirm('Are you sure to save changes?')
      if (!ask) {
        return
      }

      if (!this.newBook.title) {
        alert('Title is empty!')
        return
      }

      if (this.newBook.id) {
        try {
          await this.$store.dispatch('book/updateBook', this.newBook)
          alert('OK! This book update completed!')
        } catch (e) {
          this.$root.error({
            statusCode: 503,
            message: settings.mErrorMessages.updateBookError
          })
        }
      } else {
        try {
          await this.$store.dispatch('book/newBook', this.newBook)
          alert('OK! This book create completed!')
          this.$router.push(`${this.baseUrl}/${this.newBookId}`)
        } catch (e) {
          this.$root.error({
            statusCode: 503,
            message: settings.mErrorMessages.newBookError
          })
        }
      }
    },
    onCancel() {
      const ask = confirm('Cancel all changes of this book?')
      if (ask) {
        this.init()
      }
    },
    onNewPage() {
      this.$router.push(`${this.baseUrl}/${this.bookid}/${settings.newPage}`)
    }
  }
}
</script>

<style scoped></style>
