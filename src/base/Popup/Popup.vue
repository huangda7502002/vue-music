<template>
  <div class="popup" ref="popup">
    <slot></slot>
  </div>
</template>

<script>
let count = 10
export default {
  name: 'popup',
  mounted () {
    count++
    this.$refs.popup.style.zIndex = count
  },
  beforeDestroy () {
    count--
  }
}
</script>

<style lang="scss" scoped>
 .popup {
   width: 100%;
   height: 100%
 }
</style>
