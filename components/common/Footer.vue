<template>
  <footer>
    <span>{{ monText.company }}</span>
    <p />
    <span>{{ monText.contact }}</span>
  </footer>
</template>

<script>
import settings from '@/settings.js'
import gv from '@/mixins/common.js'

export default {
  mixins: [gv],
  computed: {
    homeUrl() {
      const admin = '/' + settings.admin
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
  border-top: 1px solid rgba(146, 140, 107, 1);
}

footer > span {
  line-height: 3rem;
  cursor: vertical-text;
}
</style>
