<template>
  <div class="new-book">
    <mon-button type="submit" width="70px"></mon-button>

    <mon-button
      type="button"
      width="70px"
      btn-style="cancel"
      @click="$emit('onCancel')"
      ></mon-button
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
