<template>
  <div>
    <mon-svg
      :view-box.camel="'0 0 48 48'"
      focusable="false"
      width="90"
      height="90"
      fill="#DBE1EC"
    >
      <path
        d="M22 30h4v4h-4zm0-16h4v12h-4zm1.99-10C12.94 4 4 12.95 4 24s8.94 20 19.99 20S44 35.05 44 24 35.04 4 23.99 4zM24 40c-8.84 0-16-7.16-16-16S15.16 8 24 8s16 7.16 16 16-7.16 16-16 16z"
      />
    </mon-svg>

    <div class="title">
      {{ monMessage }}
    </div>
    <p v-if="statusCode === 404">
      <nuxt-link to="/"> {{ firstPage }} </nuxt-link>
    </p>
  </div>
</template>
<script>
import settings from '@/settings.js'

export default {
  name: 'NuxtError',
  props: {
    error: {
      type: Object,
      default: null
    }
  },
  head() {
    return {
      title: this.message
    }
  },
  computed: {
    statusCode() {
      return (this.error && this.error.statusCode) || 500
    },
    message() {
      return this.error.message
    },
    monMessage() {
      let message = this.error.message
      if (this.error.statusCode === 404) {
        message = settings.mErrorMessages.pageNotFound
      }
      return message
    },
    firstPage() {
      return settings.monText.firstPage
    }
  }
}
</script>
<style scoped>
p {
  margin-top: 2rem;
}
</style>
