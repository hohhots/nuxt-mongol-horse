<template>
  <form @submit.prevent="onSave">
    <MonInputControl v-model="editedBook.name" placeholder=""
      ></MonInputControl
    >

    <MonInputControl v-model="editedBook.author" placeholder=""
      ></MonInputControl
    >

    <MonInputControl v-model="editedBook.writtenDate" placeholder=""
      ></MonInputControl
    >

    <MonInputControl v-model="editedBook.totalPages" placeholder=""
      >ᠨᠡᠶᠢᠲᠡ</MonInputControl
    >

    <MonInputControl v-model="editedBook.typingPersons" placeholder=""
      ></MonInputControl
    >

    <MonInputControl
      v-model="editedBook.preview"
      control-type="textarea"
      placeholder=""
      ></MonInputControl
    >

    <AdminSaveCancel @onCancel="onCancel"></AdminSaveCancel>
  </form>
</template>

<script>
import AdminSaveCancel from '@/components/admin/AdminSaveCancel'

export default {
  name: 'AdminNewBook',
  components: {
    AdminSaveCancel
  },
  data: function() {
    return {
      editedBook: {
        name: '',
        author: '',
        writtenDate: '',
        totalPages: '',
        typingPersons: '',
        preview: ''
      }
    }
  },
  methods: {
    onSave() {
      console.log(this.editedBook)
    },
    onCancel() {
      this.$router.push('/admin')
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
