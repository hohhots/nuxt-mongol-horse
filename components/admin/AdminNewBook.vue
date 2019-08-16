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

import gVariables from '@/mixins/globalVariables.js'
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
      jwt: state => state.user.jwt
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
      const id = `bookId: "${this.newBook.id}"`
      const newBook = `title: "${this.newBook.title}"
              author: "${this.newBook.author}"
              publishedAt: "${this.newBook.publishedAt}"
              preview: """${this.newBook.preview}"""`

      let query = `
            newBook( 
              ${newBook}
            )`

      if (this.newBook.id) {
        query = `
          updateBook( 
            ${id}
            ${newBook}
          )`
      }

      query = `mutation {
        ${query}
        {
          title
          author
          publishedAt
          preview
        }
      }`
      const book = await this.$axios.$post(
        '/',
        { query },
        {
          headers: { Authorization: 'Bearer ' + this.jwt }
        }
      )

      if (book.errors) {
        alert(book.errors[0].message)
      } else {
        this.$router.push('/admin')
      }
    },
    onCancel() {
      this.$router.push('/admin')
    },
    onNewPage() {
      const pageid = this.pageid || 1
      this.$router.push(
        `${this.baseUrl}/${this.bookid}/${pageid}/${this.newPage}`
      )
    }
  }
}
</script>

<style scoped></style>
