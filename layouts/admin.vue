<template>
  <monBody>
    <div class="nav-container">
      <span @click="logout" class="nav-menu-right">{{ loginText }}</span>
    </div>
    <Header />
    <nuxt />
    <Footer />
  </monBody>
</template>

<script>
import { mapGetters } from 'vuex'

import settings from '@/settings.js'
import Header from '@/components/common/Header'
import Footer from '@/components/common/Footer'

export default {
  components: {
    Header,
    Footer
  },
  data: function() {
    return {
      loginText: settings.monText.logout
    }
  },
  computed: mapGetters({
    loggedIn: 'user/loggedIn'
  }),
  beforeMount() {
    this.$store.dispatch('user/initLogin')

    if (!this.loggedIn) {
      this.$router.push('/' + settings.auth)
    }
  },
  methods: {
    logout() {
      this.$store.dispatch('user/logout')
    }
  }
}
</script>

<style>
.nav-container {
  padding: 10px;
}
.nav-menu-right {
  float: right;
}

.nav-menu-right:hover {
  cursor: pointer;
  text-decoration: underline;
}
</style>
