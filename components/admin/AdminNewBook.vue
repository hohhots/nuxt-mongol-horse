<template>
  <form @submit.prevent="onSave">
    <MonInputControl v-model="book.title" placeholder=""
      >{{ monText.bookTitle }}᠄</MonInputControl
    >

    <MonInputControl v-model="book.author" placeholder=""
      >{{ monText.author }}᠄</MonInputControl
    >

    <MonInputControl v-model="book.publishedAt" placeholder=""
      >{{ monText.publishedAt }}᠄</MonInputControl
    >

    <MonInputControl v-model="book.typers" placeholder=""
      >{{ monText.typers }}᠄</MonInputControl
    >

    <MonInputControl
      v-model="book.preview"
      control-type="textarea"
      placeholder=""
      >{{ monText.preview }}᠄</MonInputControl
    >

    <AdminSaveCancel @cancel="onCancel" @newPage="onNewPage"></AdminSaveCancel>
  </form>
</template>

<script>
import gVariables from '@/mixins/globalVariables.js'
import AdminSaveCancel from '@/components/admin/AdminSaveCancel'

export default {
  name: 'AdminNewBook',
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
  computed: {
    bookid() {
      return this.$route.params.bookid
    },
    pageid() {
      return this.$route.params.pageid
    }
  },
  methods: {
    onSave() {
      console.log(this.editedBook)
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

<style scoped>
.new-book {
  display: flex;
  justify-content: space-evenly;
  align-items: center;
}
</style>
