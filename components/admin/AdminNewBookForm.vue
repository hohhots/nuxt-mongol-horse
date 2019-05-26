<template>
  <form @submit.prevent="onSave">
    <MonInputControl v-model="editedBook.name"></MonInputControl>

    <MonInputControl v-model="editedBook.author"></MonInputControl>

    <MonInputControl v-model="editedBook.writtenDate"
      ></MonInputControl
    >

    <MonInputControl v-model="editedBook.totalPages"
      ></MonInputControl
    >

    <MonInputControl v-model="editedBook.typingPersons"
      ></MonInputControl
    >

    <MonInputControl v-model="editedBook.preview" control-type="textarea"
      ></MonInputControl
    >

    <div class="new-book">
      <MonButton type="submit"></MonButton>

      <MonButton
        type="button"
        style="margin-left: 10px"
        btn-style="cancel"
        @click="onCancel"
        ></MonButton
      >
    </div>
  </form>
</template>

<script>
export default {
  name: 'AdminNewBookForm',
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

<style lang="scss" scoped></style>
