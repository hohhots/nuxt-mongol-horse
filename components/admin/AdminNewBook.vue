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
      control-type="textarea"
      :placeholder="monText.preview"
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
      newBookId: state => state.books.BookId
    }),
    bookid() {
      return this.$route.params.bookid
    },
    pageid() {
      return this.$route.params.pageid
    }
  },
  beforeMount() {
    this.newBook = { ...this.book }
  },
  methods: {
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
        const err = await this.$store.dispatch('books/updateBook', this.newBook)
        if (err) {
          this.$root.error(err)
        } else {
          alert('OK! This book update completed!')
          // this.$router.push(`${this.baseUrl}/${this.newBookId}`)
        }
      } else {
        const err = await this.$store.dispatch('books/newBook', this.newBook)
        if (err) {
          this.$root.error(err)
        } else {
          this.$router.push(`${this.baseUrl}/${this.newBookId}`)
        }
      }
    },
    onCancel() {
      const ask = confirm('Are you sure to save changes?')
      if (ask) {
        this.$router.push('/' + settings.admin + '/' + this.bookid)
      }
    },
    onNewPage() {
      const pageid = this.pageid || 1
      this.$router.push(
        `${this.baseUrl}/${this.bookid}/${pageid}/${settings.newPage}`
      )
    }
  }
}
</script>

<style scoped></style>
