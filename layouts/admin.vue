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
@font-face {
  font-family: 'chagan';
  src: url('/fonts/chagan/chagan.eot');
  src: url('/fonts/chagan/chagan.eot?#iefix') format('embedded-opentype'),
    url('/fonts/chagan/chagan.woff2') format('woff2'),
    url('/fonts/chagan/chagan.woff') format('woff'),
    url('/fonts/chagan/chagan.ttf') format('truetype'),
    url('/fonts/chagan/chagan.svg#chagan') format('svg');
  font-weight: normal;
  font-style: normal;
}

@font-face {
  font-family: 'garchag';
  src: url('/fonts/garchag/garchag.eot');
  src: url('/fonts/garchag/garchag.eot?#iefix') format('embedded-opentype'),
    url('/fonts/garchag/garchag.woff2') format('woff2'),
    url('/fonts/garchag/garchag.woff') format('woff'),
    url('/fonts/garchag/garchag.ttf') format('truetype'),
    url('/fonts/garchag/garchag.svg#garchag') format('svg');
  font-weight: normal;
  font-style: normal;
}

@font-face {
  font-family: 'hawang';
  src: url('/fonts/hawang/hawang.eot');
  src: url('/fonts/hawang/hawang.eot?#iefix') format('embedded-opentype'),
    url('/fonts/hawang/hawang.woff2') format('woff2'),
    url('/fonts/hawang/hawang.woff') format('woff'),
    url('/fonts/hawang/hawang.ttf') format('truetype'),
    url('/fonts/hawang/hawang.svg#hawang') format('svg');
  font-weight: normal;
  font-style: normal;
}

*,
*:before,
*:after {
  /* box-sizing: border-box; */
  margin: 0;
  font-family: 'chagan', 'Source Sans Pro', -apple-system, BlinkMacSystemFont,
    'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
  font-size: 20px;
  line-height: 25px;
}

p,
input,
span,
textarea {
  cursor: vertical-text;
}

html,
body {
  overflow-y: hidden;
}

html {
  font-size: 16px;
  word-spacing: 1px;
  line-height: 1.5em;
  color: #333;
  -ms-text-size-adjust: 100%;
  -webkit-text-size-adjust: 100%;
  -moz-osx-font-smoothing: grayscale;
  -webkit-font-smoothing: antialiased;
  margin: 3px;
  border: 2px solid #393;
  padding: 2px;
}

body {
  margin: 3px;
  border: 2px solid #933;
  padding: 2px;
}

a:link {
  cursor: pointer;
  text-decoration: none;
  color: #1a0dab;
}

a:hover {
  text-decoration: underline;
}

a:visited {
  color: #609;
}

pre {
  white-space: pre-wrap;
}
</style>
