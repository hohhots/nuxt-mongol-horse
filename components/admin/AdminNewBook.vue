<template>
  <form @submit.prevent="onSubmit">
    <MonInputControl v-model="newBook.title" :placeholder="monText.bookTitle"
      >{{ monText.bookTitle }}᠄</MonInputControl
    >

    <MonInputControl v-model="newBook.author" :placeholder="monText.author"
      >{{ monText.author }}᠄</MonInputControl
    >

    <MonInputControl
      v-model="newBook.publishedAt"
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
      if (this.newBook.id) {
        await this.$store
          .dispatch('books/updateBook', this.newBook)
          .then(() => this.$router.push(`${this.baseUrl}/${this.newBookId}`))
          .catch(e => alert(e))
      } else {
        await this.$store
          .dispatch('books/newBook', this.newBook)
          .then(() => this.$router.push(`${this.baseUrl}/${this.newBookId}`))
          .catch(e => alert(e))
      }
    },
    onCancel() {
      this.$router.push('/' + settings.admin)
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
