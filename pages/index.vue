<template>
  <div>
    <span>
                 
                 19
          
    </span>
    <div
      style="text-align:center;margin:36px auto 18px;width:273.5px;line-height:0"
    >
      <mon-img
        src="images/logo.jpg"
        monstyle="border:none;max-width:100%;"
        width="200px"
      />
    </div>
    <div class="container">
      <mon-search />
    </div>

    <nuxt-link to="books">Books</nuxt-link>
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
