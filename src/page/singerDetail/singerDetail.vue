<template>
  <transition name="fadeUp" >
    <div class="singerDetail" v-if="singerShow">
    <div ref="header" class="header">
      <div class="back" @click="back">
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
        <img :src="singerArtist.picUrl" alt="" ref="bgImg">
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
            <div class="loading" v-if="list.length === 0">
              <loading></loading>
              &nbsp;努力加载中...
            </div>
            <component :is="type"
                       :albumList="list"
                       :tracks="list"
                       :MVList="list"
                       @selectMVItem="selectMV"
            ></component>
          </scroll>
        </div>

      </div>
    </div>
  </div>
  </transition>
</template>

<script>
import {mapGetters, mapActions} from 'vuex'
import music from '@/components/MusicList/MusicList'
import album from '@/components/albumList/albumList'
import mv from '@/components/MVList/MVList'
import getSingerMusic from '@/api/getSingerMusic'
import getSingerAlbum from '@/api/getSingerAlbum'
import getSingerMV from '@/api/getSingerMV'
import Scroll from '@/components/scroll/scroll'
import loading from '@/base/loading/loading'

export default {
  name: 'singer-detail',
  components: {
    music, Scroll, album, mv, loading
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
      this.list = []
      if (this.type === 'music') {
        getSingerMusic(this.singerArtist.id).then((data) => {
          if (data.code === 200) {
            this.list = data.hotSongs
            for (let i = 0; i < data.hotSongs.length; i++) {
              this.list[i].alias = data.hotSongs[i].alia
              this.list[i].artists = data.hotSongs[i].ar
              this.list[i].album = data.hotSongs[i].al
            }
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
      let h1 = this.$refs.img.clientHeight
      let h2 = this.$refs.ul.clientHeight
      let winH = document.documentElement.clientHeight
      let height = winH - h1 - h2
      this.$refs.tabContent.style.height = height + 'px'
    },
    scroll (pos) {
      this.scrollY = pos.y
    },
    back () {
      this.list = []
      this.hideSingerPage()
    },
    selectMV (id) {
      this.showMVDetailPage(id)
    },
    ...mapActions([
      'hideSingerPage',
      'showMVDetailPage'
    ])
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
          this.list = []
          this.type = 'music'
          this.initHeight()
          this.getData()
        })
      }
    },
    scrollY (newY) {
      let h1 = this.$refs.img.clientHeight
      let h2 = this.$refs.header.clientHeight
      let translateY = h1 - h2
      newY = Math.max(newY, -translateY)
      this.$refs.ul.style.transform = `translateY(${newY}px)`
      if (newY > 0) {
        let imgH = this.$refs.bgImg.offsetHeight
        const percent = (Math.abs(newY) + imgH) / imgH
        this.$refs.img.style.transform = `scale(${percent})`
      } else {
        this.$refs.header.style.backgroundColor = `rgba(0,0,0,${newY / (-translateY) * 0.6})`
        this.$refs.img.style.transform = `translateY(${newY}px)`
      }
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
      z-index: 10;
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
        position: relative;
        z-index: 5;
        img {
          width: 100%;
          position: absolute;
          left: 0;
          top: 0;
          z-index: 5;
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
        z-index: 5;
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
      .tabs {
        z-index: 0;
        position: relative;
        .loading {
          position: absolute;
          left: 0;
          top: 0;
          width: 100%;
          display: flex;
          justify-content: center;
          align-items: center;
          padding: 16px 0;
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

  .fadeUp-enter-active,.fadeUp-leave-active {
    transition: all .2s;
  }
  .fadeUp-enter,.fadeUp-leave-active {
    opacity: 0;
    transform: translateY(1rem)
  }

</style>
