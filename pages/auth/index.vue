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
import { mapState } from 'vuex'

import settings from '@/settings.js'
import gVariables from '@/mixins/common.js'
import AdminSaveCancel from '@/components/admin/AdminSaveCancel'

export default {
  components: {
    AdminSaveCancel
  },
  mixins: [gVariables],
  data() {
    return {
      email: '',
      password: ''
    }
  },
  computed: {
    ...mapState({
      user: state => state.user.user,
      jwt: state => state.user.jwt
    })
  },
  beforeMount() {
    this.redirect()
  },
  methods: {
    async onSubmit() {
      await this.$store.dispatch('user/login', {
        email: this.email,
        password: this.password
      })
      this.redirect()
    },
    onCancel() {
      this.$router.push('/')
    },
    redirect() {
      if (this.jwt) {
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
