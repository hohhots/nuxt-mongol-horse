<template>
  <footer>
    {{ company }}
    <p />
    {{ contact }}
  </footer>
</template>

<script>
export default {
  data() {
    return {
      company: 'ᠦᠪᠦᠷ ᠮᠤᠩᠭ᠋ᠤᠯ ᠤᠨ ᠮᠤᠩᠭᠤᠯ ᠮᠤᠷᠢ    ',
      contact: 'ᠬᠣᠯᠪᠤᠭ᠎ᠠ ᠄ 086-13804749201'
    }
  },
  computed: {
    homeUrl() {
      const admin = '/admin'
      const path = this.$route.path
      if (path === admin || path.indexOf(admin + '/') === 0) {
        return admin
      }
      return '/'
    }
  }
}
</script>

<style scoped>
footer {
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  flex-wrap: wrap;
  margin-top: 50px;
  padding-top: 20px;
  padding-bottom: 20px;
  border-top: 1px solid #cfcfcf;
}
</style>
