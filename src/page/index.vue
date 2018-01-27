<template>
  <div id="indexPage">
    <div class="title">
      <div class="titleItem">音乐</div>
      <div class="titleItem">视频</div>
      <div class="titleItem">电台</div>
    </div>
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
    </div>
  </div>
</template>

<script>
import Slider from '@/components/slider/slider'
import RecommendMusic from '@/components/recommendMusic/recommendMusic'
import RecommendPrivate from '@/components/recommendPrivate/recommendPrivate'
import getMusicList from '@/api/getMusicList.js'
import getPrivateContent from '@/api/getPrivateContent.js'
export default {
  name: 'index',
  data () {
    return {
      privateList: [],
      musicList: []
    }
  },
  components: {
    Slider, RecommendMusic, RecommendPrivate
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
    }
  },
  mounted () {
    this.getMusic()
    this.getPrivate()
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
   .card {
     height: 3rem;
     .cardItem {
       width: 25%;
     }
   }
 }
</style>
