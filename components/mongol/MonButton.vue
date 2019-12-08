<template>
  <button
    :class="btnStyle"
    :style="'width: ' + width"
    v-bind="$attrs"
    v-on="$listeners"
    class="button"
  >
    <slot />
  </button>
</template>

<script>
export default {
  name: 'MonButton',
  props: {
    width: {
      type: String,
      default: 'auto'
    },
    btnStyle: {
      type: String,
      default: ''
    }
  }
}
</script>

<style scoped>
.button {
  font: inherit;
  background-color: #3971c6;
  color: white;
  padding: 5px;
  cursor: pointer;
  border: 0;
}

.button:hover,
.button:active,
.cancel:hover,
.cancel:active {
  background-color: #06f;
}

.inverted {
  background-color: white;
  color: black;
  border: 1px solid transparent;
}

.inverted:hover,
.inverted:active {
  color: #ccc;
  background-color: white;
  border: 1px solid transparent;
}
</style>
