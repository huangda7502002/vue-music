<template>
  <div class="singerDetail" v-if="singerShow">
    <div class="header">
      <div class="back">
        <i class="icon-back"></i>
      </div>
      <div class="author">
        {{singerArtist.name}}
        <span v-if="singerArtist.alias.length > 0">({{singerArtist.alias[0]}})</span>
      </div>
      <div class="share">
        <i class="icon-share"></i>
      </div>
    </div>
    <div class="content">
      <div class="img">
        <img :src="singerArtist.picUrl" alt="">
      </div>

      <div class="tabs">
        <ul class="option" ref="ul">
          <li class="tabItem active" @click="selectItem">热门&nbsp;<span class="num">50</span></li>
          <li class="tabItem" @click="selectItem">专辑&nbsp;<span class="num">{{singerArtist.albumSize | count}}</span></li>
          <li class="tabItem" @click="selectItem">视频&nbsp;<span class="num">{{singerArtist.mvSize | count}}</span></li>
          <li class="tabItem" @click="selectItem">歌手信息</li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
import {mapActions, mapGetters} from 'vuex'
export default {
  name: 'singer-detail',
  data () {
    return {

    }
  },
  methods: {
    selectItem (e) {
      let list = this.$refs.ul.children
      for (let i = 0; i < list.length; i++) {
        list[i].className = 'tabItem'
      }
      e.target.className = 'tabItem active'
    }
  },
  computed: {
    ...mapGetters([
      'singerArtist',
      'singerShow'
    ])
  }
}
</script>

<style lang="scss" scoped>
  .singerDetail {
    position: absolute;
    width: 100%;
    height: 100%;
    left: 0;
    top: 0;
    background: #fff;
    z-index: 20;
    .header {
      position: absolute;
      left: 0;
      top: 0;
      height: 1.57rem;
      width: 100%;
      display:flex;
      background:transparent;
      .back,.share {
        width: 1.67rem;
        height: 100%;
        text-align:center;
        font-size: .57rem;
        color: #fff;
        padding-top: .51rem;
        box-sizing: border-box;
      }
      .author {
        flex: 1;
        color:#fff;
        line-height: 1.57rem;
        font-size: .48rem;
      }
    }
    .content {
      .img {
        width: 100%;
        height: 7.64rem;
        img {
          width: 100%;
        }
      }
      .option {
        display:flex;
        height: 1.2rem;
        background: #fff;
        color: #666;
        text-align:center;
        position: relative;
        font-size: .38rem;
        line-height: 1.2rem;
        .tabItem {
          flex: 1;
          position: relative;
          .num {
            color: #a0a1a1;
          }
        }
        .tabItem.active {
          color: #d33a31;
          .num {
            color: #d33a31;
          }
        }
        .tabItem.active::after {
          content: '';
          position: absolute;
          width: 100%;
          left: 0;
          bottom: 0;
          height: .06rem;
          background:#d33a31;
        }
      }
    }
  }

</style>
