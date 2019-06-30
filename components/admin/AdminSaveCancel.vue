<template>
  <div class="buttons">
    <div class="sava-cancel">
      <mon-button type="submit" width="70px"></mon-button>

      <mon-button
        type="button"
        width="70px"
        btn-style="cancel"
        @click="$emit('onCancel')"
        ></mon-button
      >
    </div>

    <div v-if="$route.params.bookid" class="new-page">
      <mon-button type="button" width="70px"></mon-button>
    </div>
  </div>
</template>

<script>
export default {}
</script>

<style scoped>
MonButton {
  width: 70px;
}
.buttons,
.sava-cancel,
.new-page {
  display: flex;
  justify-content: space-evenly;
}
.buttons {
  flex-flow: column;
}
.sava-cancel {
  align-items: unset;
}
.new-page {
  border-top: 1px dashed #cfcfcf;
  padding-top: 49px;
  margin-top: 2rem;
}
</style>
