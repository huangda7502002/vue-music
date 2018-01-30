<template>
  <div id="musicPage">
    <b-scroll ref="scrollView" class="scrollView">
      <div class="content">
        <div class="slider">
          <slider :sliderList="recommendBanner"></slider>
        </div>
        <div class="card">
          <div class="cardItem">
            <div class="icon-wrap">
              <i class="icon icon-fm"></i>
            </div>
            <p class="description">私人FM</p>
          </div>
          <div class="cardItem">
            <div class="icon-wrap">
              <i class="icon icon-date"></i>
              <p class="date">{{day}}</p>
            </div>
            <p class="description">每日推荐</p>
          </div>
          <div class="cardItem">
          </div>
          <div class="cardItem">
            <div class="icon-wrap">
              <i class="icon icon-rank-list"></i>
            </div>
            <p class="description">排行榜</p>
          </div>
        </div>
        <div class="recommend">
          <recommend-music titleName="推荐歌单" :musicList="recommendMusicList"></recommend-music>
          <recommend-private titleName="独家放送" :privateList="recommendPrivate"></recommend-private>
          <recommend-m-v titleName="推荐MV" :MVList="recommendMV"></recommend-m-v>
        </div>
      </div>
    </b-scroll>
  </div>
</template>

<script>
import {mapActions, mapGetters} from 'vuex'
import Slider from '@/components/slider/slider'
import RecommendMusic from '@/components/recommendMusic/recommendMusic'
import RecommendPrivate from '@/components/recommendPrivate/recommendPrivate'
import RecommendMV from '@/components/recommendMV/recommendMV'
import BScroll from '@/components/scroll/scroll'

export default {
  name: 'music-page',
  components: {
    Slider, RecommendPrivate, RecommendMusic, RecommendMV, BScroll
  },
  data () {
    return {
      day: ''
    }
  },
  computed: {
    ...mapGetters([
      'recommendBanner',
      'recommendMusicList',
      'recommendPrivate',
      'recommendMV'
    ])
  },
  methods: {
    ...mapActions([
      'getRecommendBanner',
      'getRecommendMusicList',
      'getRecommendPrivate',
      'getRecommendMV'
    ]),
    getDate () {
      this.day = (new Date()).getDate()
    }
  },
  mounted () {
    this.getRecommendBanner()
    this.getRecommendMusicList()
    this.getRecommendPrivate()
    this.getRecommendMV()
    this.getDate()
  },
  updated () {
    this.$refs.scrollView.refresh()
  }
}
</script>

<style lang="scss" scoped>
  #musicPage {
    width: 100%;
    height: 100%;
    .scrollView {
      width: 100%;
      height: 100%;
      box-sizing: border-box;
    }
    .card {
      height: 3rem;
      display:flex;
      .cardItem {
        width: 25%;
        text-align:center;
        .icon-wrap {
          width: 1.5rem;
          height: 1.5rem;
          border-radius: 50%;
          border:.03rem solid #d33a31;
          margin:0 auto;
          margin-top: .42rem;
          margin-bottom: .24rem;
          position: relative;
          .icon {
            font-size: .70rem;
            line-height: 1.5rem;
            color: #d33a31;
          }
          .description {
            color: #303131;
            font-size: .3rem;
          }
        }
      }
      .cardItem:nth-child(2) {
        .date {
          position: absolute;
          top: 0;
          left: 0;
          bottom: 0;
          right: 0;
          text-align:center;
          line-height: 1.6rem;
          color: #d33a31;
          font-size: .27rem;
        }
        .icon {
          line-height: 1.4rem;
        }
      }
    }
  }
</style>
