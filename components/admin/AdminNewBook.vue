<template>
  <form @submit.prevent="onSave">
    <MonInputControl v-model="editedBook.title" placeholder=""
      ></MonInputControl
    >

    <MonInputControl v-model="editedBook.author" placeholder=""
      ></MonInputControl
    >

    <MonInputControl v-model="editedBook.writtenDate" placeholder=""
      ></MonInputControl
    >

    <MonInputControl
      v-model="totalPages"
      placeholder=""
      disabled="true"
      >ᠨᠡᠶᠢᠲᠡ</MonInputControl
    >

    <MonInputControl v-model="editedBook.typers" placeholder=""
      ></MonInputControl
    >

    <MonInputControl
      v-model="editedBook.preview"
      control-type="textarea"
      placeholder=""
      ></MonInputControl
    >

    <AdminSaveCancel @cancel="onCancel" @newPage="onNewPage"></AdminSaveCancel>
  </form>
</template>

<script>
import { mapGetters } from 'vuex'

import gVariables from '@/mixins/globalVariables.js'
import AdminSaveCancel from '@/components/admin/AdminSaveCancel'

export default {
  name: 'AdminNewBook',
  components: {
    AdminSaveCancel
  },
  mixins: [gVariables],
  data: function() {
    return {
      editedBook: this.getBook()(this.$route.params.bookid)
    }
  },
  computed: {
    bookid() {
      return this.$route.params.bookid
    },
    pageid() {
      return this.$route.params.pageid
    },
    totalPages() {
      return '' + this.editedBook.content.length
    }
  },
  methods: {
    ...mapGetters({
      getBook: 'books/getBook'
    }),
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
