<template>
  <form @submit.prevent="onSubmit">
    <div id="title">
      <h1>{{ monText.login }}</h1>
    </div>

    <MonInputControl v-model="email">{{ monText.email }}᠄</MonInputControl>

    <MonInputControl v-model="password" type="password"
      >{{ monText.password }}᠄</MonInputControl
    >

    <AdminSaveCancel @cancel="onCancel"></AdminSaveCancel>
  </form>
</template>

<script>
import { mapGetters } from 'vuex'

import settings from '@/settings.js'
import gv from '@/mixins/common.js'
import AdminSaveCancel from '@/components/admin/AdminSaveCancel'

export default {
  head() {
    return {
      title: 'Auth User'
    }
  },
  components: {
    AdminSaveCancel
  },
  mixins: [gv],
  data() {
    return {
      email: '',
      password: ''
    }
  },
  computed: mapGetters({
    loggedIn: 'user/loggedIn'
  }),
  beforeMount() {
    this.redirect()
  },
  methods: {
    async onSubmit() {
      try {
        await this.$store.dispatch('user/login', {
          email: this.email,
          password: this.password
        })
        this.redirect()
      } catch (e) {
        this.$root.error({
          statusCode: 401,
          message: settings.mErrorMessages.loginError
        })
      }
    },
    onCancel() {
      this.$router.push('/')
    },
    redirect() {
      if (this.loggedIn) {
        this.$router.push('/' + settings.admin)
      }
    }
  }
}
</script>

<style scoped>
#title {
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>
