<template>
  <div id="indexPage">
    <div class="title">
      <div class="titleItem">音乐</div>
      <div class="titleItem">视频</div>
      <div class="titleItem">电台</div>
    </div>
    <scroll>
      <div class="content">
        <div class="slider">
          <slider></slider>
        </div>
        <div class="card">
          <div class="cardItem"></div>
          <div class="cardItem"></div>
          <div class="cardItem"></div>
          <div class="cardItem"></div>
        </div>
        <div class="recommend">
          <recommend-music titleName="推荐歌单" :musicList="musicList"></recommend-music>
          <recommend-private titleName="独家放送" :privateList="privateList"></recommend-private>
          <recommend-mv titleName="推荐MV" :MVList="MVList"></recommend-mv>
        </div>
      </div>
    </scroll>
  </div>
</template>

<script>
import Slider from '@/components/slider/slider'
import RecommendMusic from '@/components/recommendMusic/recommendMusic'
import RecommendPrivate from '@/components/recommendPrivate/recommendPrivate'
import RecommendMv from '@/components/recommendMV/recommendMV'
import getMusicList from '@/api/getMusicList.js'
import getPrivateContent from '@/api/getPrivateContent.js'
import getMVList from '@/api/getMVList'
import Scroll from '@/components/scroll/scroll'

export default {
  name: 'index',
  data () {
    return {
      privateList: [],
      musicList: [],
      MVList: []
    }
  },
  components: {
    Slider, RecommendMusic, RecommendPrivate, RecommendMv, Scroll
  },
  methods: {
    getMusic () {
      getMusicList((data) => {
        if (data) {
          if (data.length > 6) {
            this.musicList = data.slice(0, 6)
          } else {
            this.musicList = data
          }
        } else {
          this.musicList = []
        }
      })
    },
    getPrivate () {
      getPrivateContent((data) => {
        if (data) {
          this.privateList = data
        } else {
          this.privateList = []
        }
      })
    },
    getMV () {
      getMVList((data) => {
        if (data) {
          this.MVList = data
        } else {
          this.MVList = []
        }
      })
    }
  },
  mounted () {
    this.getMusic()
    this.getPrivate()
    this.getMV()
  }
}
</script>

<style lang="scss" scoped>
 #indexPage {
   .title {
     height: 1.15rem;
     background:#fff;
     .titleItem {
       width: 2rem;
       margin-left: 1.2rem;
       float:left;
       line-height: 1.15rem;
       text-align:center;
     }
   }
   .content {
     position:fixed;
     top: 1.15rem + 1.57rem;
     bottom: 0;
     width: 100%;
     .card {
       height: 3rem;
       .cardItem {
         width: 25%;
       }
     }
   }

 }
</style>
