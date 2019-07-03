<template>
  <div>
    <div class="new-book"></div>
    <AdminNewBook />
  </div>
</template>

<script>
import AdminNewBook from '@/components/admin/AdminNewBook'

export default {
  components: {
    AdminNewBook
  },
  data: function() {
    return {
      newBook: {}
    }
  },
  methods: {
    onSave() {
      console.log(this.newBook)
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
  margin-bottom: 2rem;
}
</style>
