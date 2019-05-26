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
      ></MonInputControl
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

<style scoped>
.new-book {
  display: flex;
  justify-content: space-evenly;
  align-items: center;
}
</style>
