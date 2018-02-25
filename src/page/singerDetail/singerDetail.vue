<template>
  <div class="singerDetail" v-if="singerShow">
    <div ref="header" class="header">
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
      <div class="img" ref="img">
        <img :src="singerArtist.picUrl" alt="">
      </div>
      <ul class="option" ref="ul">
        <li class="tabItem active" @click="selectItem(0)">热门&nbsp;<span class="num">50</span></li>
        <li class="tabItem" @click="selectItem(1)">专辑&nbsp;<span class="num">{{singerArtist.albumSize | count}}</span></li>
        <li class="tabItem" @click="selectItem(2)">视频&nbsp;<span class="num">{{singerArtist.mvSize | count}}</span></li>
        <li class="tabItem" @click="selectItem(3)">歌手信息</li>
      </ul>
      <div class="tabs">

        <div class="tabContent" ref="tabContent">
          <scroll @scroll="scroll" :listenScroll="listenScroll" :probe-type="probeType" :data="list" ref="scroll">
            <component :is="type"
                       :albumList="list"
                       :tracks="list"
                       :MVList="list"
            ></component>
          </scroll>
        </div>

      </div>
    </div>
  </div>
</template>

<script>
import {mapGetters} from 'vuex'
import music from '@/components/MusicList/MusicList'
import album from '@/components/albumList/albumList'
import mv from '@/components/MVList/MVList'
import getSingerMusic from '@/api/getSingerMusic'
import getSingerAlbum from '@/api/getSingerAlbum'
import getSingerMV from '@/api/getSingerMV'
import Scroll from '@/components/scroll/scroll'

export default {
  name: 'singer-detail',
  components: {
    music, Scroll, album, mv
  },
  data () {
    return {
      type: 'music',
      list: [],
      scrollY: 0
    }
  },
  methods: {
    selectItem (index) {
      let list = this.$refs.ul.children
      for (let i = 0; i < list.length; i++) {
        list[i].className = 'tabItem'
      }
      list[index].className = 'tabItem active'

      if (index === 0) {
        this.type = 'music'
      } else if (index === 1) {
        this.type = 'album'
      } else if (index === 2) {
        this.type = 'mv'
      } else if (index === 3) {
        this.type = 'desc'
      }
      this.getData()
    },
    getData () {
      this.initHeight()
      if (this.type === 'music') {
        getSingerMusic(this.singerArtist.id).then((data) => {
          if (data.code === 200) {
            this.list = data.hotSongs
          }
        })
      }
      if (this.type === 'album') {
        getSingerAlbum(this.singerArtist.id).then((data) => {
          if (data.code === 200) {
            this.list = data.hotAlbums
          }
        })
      }
      if (this.type === 'mv') {
        getSingerMV(this.singerArtist.id).then((data) => {
          if (data.code === 200) {
            this.list = data.mvs
            console.log(data)
          }
        })
      }
    },
    initHeight () {
      console.log(this.$refs.img)
      let h1 = this.$refs.img.clientHeight
      let h2 = this.$refs.ul.clientHeight
      let winH = document.documentElement.clientHeight
      let height = winH - h1 - h2
      this.$refs.tabContent.style.height = height + 'px'
    },
    scroll (pos) {
      this.scrollY = pos.y
      console.log()
    }
  },
  computed: {
    ...mapGetters([
      'singerArtist',
      'singerShow'
    ])
  },
  watch: {
    singerShow () {
      if (this.singerShow) {
        this.$nextTick(() => {
          this.initHeight()
        })
      }
    },
    scrollY (newY) {
      let h1 = this.$refs.img.clientHeight
      let h2 = this.$refs.header.clientHeight
      let translateY = h1 - h2
      newY = Math.max(newY, -translateY)
      this.$refs.ul.style.transform = `translateY(${newY}px)`
    }
  },
  created () {
    this.probeType = 3
    this.listenScroll = true
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
      .tabContent {
        background: #f2f4f5;
        /deep/ .BScroll {
          overflow:visible;
        }
      }
    }
  }

</style>
