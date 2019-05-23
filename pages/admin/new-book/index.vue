<template>
  <div>
    <dir class="new-book"></dir>
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

      <MonInputControl v-model="editedBook.content" control-type="textarea"
        ></MonInputControl
      >

      <MonButton type="submit"></MonButton>

      <MonButton
        type="button"
        style="margin-left: 10px"
        btn-style="cancel"
        @click="onCancel"
        ></MonButton
      >
    </form>
  </div>
</template>

<script>
export default {
  data: function() {
    return {
      editedBook: {
        name: '',
        author: '',
        writtenDate: '',
        totalPages: '',
        typingPersons: '',
        preview: '',
        image: ''
      }
    }
  },
  methods: {
    onSave() {
      console.log(this.editedBook)
    },
    onCancel() {}
  }
}
</script>

<style scoped>
.new-book {
  display: flex;
  justify-content: center;
  align-content: center;
}
</style>
