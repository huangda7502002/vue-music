<template>
  <div id="app" class="main">
    <my-header ref="header"></my-header>
    <div class="contentPage" ref="contentPage">
      <keep-alive>
        <router-view></router-view>
      </keep-alive>
    </div>
    <singer-detail></singer-detail>
    <search></search>
    <player></player>
    <music-list-detail-page></music-list-detail-page>
    <m-v-detail-page></m-v-detail-page>
  </div>
</template>

<script>
import MyHeader from '@/components/MyHeader/MyHeader'
import Player from '@/components/player/player'
import musicListDetailPage from '@/page/musicListDetailPage/musicListDetailPage'
import MVDetailPage from '@/page/MVDetailPage/MVDetailPage'
import Search from '@/page/search/search'
import singerDetail from '@/page/singerDetail/singerDetail'

export default {
  name: 'App',
  components: {
    MyHeader, Player, musicListDetailPage, MVDetailPage, Search, singerDetail
  },
  data () {
    return {
    }
  },
  methods: {
    init () {
      let winHeight = document.documentElement.clientHeight
      let headerHeight = this.$refs.header.$el.offsetHeight
      this.$refs.contentPage.style.height = winHeight - headerHeight + 'px'
    }
  },
  mounted () {
  }
}
</script>

<style lang="scss">
  .main {
    width: 100%;
    height: 100%;
    position: relative;
    font-size: 13px;
    font-family: Helvetica, sans-serif;
    color:#333;
    ul {
      list-style-type: none;
      margin:0px;
      padding: 0px;
    }
    p {
      padding: 0px;
      margin: 0px;
    }
    &>.contentPage {
      width: 100%;
      height: 100%;
      box-sizing: border-box;
      padding-top: 1.57rem;
      overflow:hidden;
    }
  }
</style>
