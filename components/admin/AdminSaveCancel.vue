<template>
  <div class="new-book">
    <MonButton type="submit"></MonButton>

    <MonButton type="button" btn-style="cancel" @click="$emit('onCancel')"
      ></MonButton
    >
  </div>
</template>

<script>
export default {}
</script>

<style scoped>
MonButton {
  width: 70px;
}
.new-book {
  display: flex;
  justify-content: space-evenly;
  align-items: center;
}
</style>
