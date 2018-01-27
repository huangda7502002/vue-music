<template>
  <div id="app">
    <my-header></my-header>
    <router-view></router-view>
  </div>
</template>

<script>
import MyHeader from '@/components/MyHeader/MyHeader'
export default {
  name: 'App',
  components: {
    MyHeader
  }
}
</script>

<style lang="scss">
  #app {
    font-size: 12px;
    ul {
      list-style-type: none;
      margin:0px;
      padding: 0px;
    }
    p {
      padding: 0px;
      margin: 0px;
    }
  }
</style>
