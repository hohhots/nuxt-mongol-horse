<template>
  <div class="buttons">
    <div class="sava-cancel">
      <mon-button type="submit" width="70px"></mon-button>

      <mon-button type="button" width="70px" @click="$emit('cancel')"
        ></mon-button
      >
    </div>

    <div v-if="editExistingPage" class="new-page">
      <mon-button type="button" width="70px" @click="$emit('newPage')"
        ></mon-button
      >
    </div>
  </div>
</template>

<script>
import globalVariables from '@/mixins/globalVariables.js'

export default {
  mixins: [globalVariables]
}
</script>

<style scoped>
mon-button {
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
