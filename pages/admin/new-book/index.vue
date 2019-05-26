<template>
  <div>
    <dir class="new-book"></dir>
    <AdminNewBookForm />
  </div>
</template>

<script>
import AdminNewBookForm from '@/components/admin/AdminNewBookForm'

export default {
  components: {
    AdminNewBookForm
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
  justify-content: center;
  align-content: center;
}
</style>
