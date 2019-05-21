<template>
  <div class="container">
    <div class="types">
      <span>Text</span>
      <span>Image</span>
    </div>
    <div class="content">
      <span>( Text + {{ pageId }} )</span>
      <span>( Image + {{ pageId }} )</span>
    </div>
  </div>
</template>

<script>
export default {
  data: function() {
    return {
      pageId: this.$route.params.pageid
    }
  }
}
</script>

<style scoped></style>
