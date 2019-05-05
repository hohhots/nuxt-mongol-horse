<template>
  <!-- <div ref="container"> -->
  <svg ref="svg" xmlns="http://www.w3.org/2000/svg">
    <slot></slot>
  </svg>
  <!-- </div> -->
</template>

<script>
export default {}
</script>

<style scoped>
svg {
  -webkit-transform-origin: left top;
  -ms-transform-origin: left top;
  transform-origin: left top;
  -webkit-transform: rotate(-90deg) rotateY(180deg);
  transform: rotate(-90deg) rotateY(180deg);
}
</style>
