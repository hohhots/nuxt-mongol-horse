<template>
  <div>
    <div style="text-align:center;margin:0 auto 0;width:273.5px;line-height:0">
      <nuxt-link to="/">
        <mon-img
          src="/images/logo.jpg"
          monstyle="border:none;max-width:100%;"
          width="200px"
        />
      </nuxt-link>
    </div>
    <div class="container">
      <mon-search />
    </div>
  </div>
</template>

<script>
export default {}
</script>

<style scoped>
.container {
  margin: 0 auto;
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
}
</style>
