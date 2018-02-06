<template>
  <div class="MVDetailPage" v-show="MVDetailShow">
    <div class="top" ref="top">
      <my-video v-if="MV.data" :videoDetail="MV.data"></my-video>
    </div>
    <div class="bottom" ref="bottom">
        <div class="loading" v-if="!comment.comments">
          <loading></loading>
          &nbsp;努力加载中...
        </div>
    </div>
  </div>
</template>

<script>
import Loading from '@/base/loading/loading'
import getMVDetail from '@/api/getMVDetail'
import getMVSimi from '@/api/getMVSimi'
import getMVComment from '@/api/getMVComment'
import myVideo from '@/base/myVideo/myVideo'
import Scroll from '@/components/scroll/scroll'

import {mapGetters} from 'vuex'
export default {
  name: 'm-v-detail-page',
  data () {
    return {
      MV: {},
      comment: {},
      simi: []
    }
  },
  components: {
    Loading, myVideo
  },
  computed: {
    ...mapGetters([
      'MVDetailShow',
      'MVDetailId'
    ])
  },
  methods: {
    initBottomHeight () {
      let winH = document.documentElement.clientHeight
      let topH = this.$refs.top.clientHeight
      this.$refs.bottom.style.height = winH - topH + 'px'
    }
  },
  mounted () {
    this.initBottomHeight()
  },
  watch: {
    MVDetailId () {
      console.log(this.MVDetailId)
      getMVDetail(this.MVDetailId).then((data) => {
        this.MV = data
      })
      getMVSimi(this.MVDetailId).then((data) => {
        this.simi = data
      })
      getMVComment(this.MVDetailId).then((data) => {
        this.comment = data
      })
    }
  }
}
</script>

<style lang="scss" scoped>
  .MVDetailPage {
    position: absolute;
    width: 100%;
    height: 100%;
    left: 0;
    top: 0;
    background:#f2f4f5;
    z-index: 10;
    .top {
      width: 100%;
      height: 6.07rem;
    }
    .bottom {
      .loading {
        width: 100%;
        display: flex;
        justify-content: center;
        align-items: center;
        padding: 16px 0;
      }
    }
  }
</style>
