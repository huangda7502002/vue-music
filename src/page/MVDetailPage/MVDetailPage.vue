<template>
  <transition name="fadeUp">
    <div class="MVDetailPage" v-show="MVDetailShow">
      <div v-show="showControl" class="header">
        <div class="back" @click="close">
          <i class="icon-back"></i>
        </div>
        <div class="titleName">
          <span v-if="MV.data">{{MV.data.name}}</span>
        </div>
        <div class="share">
          <i class="icon-SHARE2"></i>
        </div>
        <div class="menu">
          <i class="icon-list-circle-small"></i>
        </div>
      </div>
      <div class="top" ref="top">
        <my-video ref="video" @toggleControl="toggleControl" v-if="MV.data" :videoDetail="MV.data"></my-video>
      </div>
      <div class="bottom" ref="bottom">
        <div class="loading" v-if="!comment.length > 0 || simi.length ===0 || !MV.data">
          <loading></loading>
          &nbsp;努力加载中...
        </div>
        <scroll @pullingUp="pullingUp" :pullUpLoad="{threshold: 200}" ref="scroll" v-if="comment.length > 0 && simi.length !==0 && MV.data">
          <div>
            <div class="title">
              <div class="tag">MV</div>
              <div class="name">{{MV.data.name}}</div>
            </div>
            <div class="author">
              歌手&nbsp;:&nbsp;{{MV.data.artistName}}
            </div>
            <div class="publish">
              发布&nbsp;:&nbsp;{{MV.data.publishTime}}
              &nbsp;&nbsp;|&nbsp;&nbsp;
              播放&nbsp;:&nbsp;{{MV.data.playCount}}
            </div>
            <div class="operation">
              <div class="operationItem">
                <i class="icon-music"></i><br>
                <p>{{MV.data.likeCount}}</p>
              </div>
              <div class="operationItem">
                <i class="icon-msg"></i><br>
                <p>{{MV.data.subCount}}</p>
              </div>
              <div class="operationItem">
                <i class="icon-msg"></i><br>
                <p>{{MV.data.commentCount}}</p>
              </div>
              <div class="operationItem">
                <i class="icon-share"></i><br>
                <p>{{MV.data.shareCount}}</p>
              </div>
            </div>

            <div class="recommend">
              <div class="relative">相关推荐</div>
              <m-v-list :MVList="simi" @selectMVItem="selectSimiItem"></m-v-list>
            </div>
            <div class="commend">
              <comment-list :comment="comment"></comment-list>
            </div>
          </div>
        </scroll>
      </div>
    </div>
  </transition>

</template>

<script>
import Loading from '@/base/loading/loading'
import getMVDetail from '@/api/getMVDetail'
import getMVSimi from '@/api/getMVSimi'
import getMVComment from '@/api/getMVComment'
import myVideo from '@/base/myVideo/myVideo'
import Scroll from '@/components/scroll/scroll'
import MVList from '@/components/MVList/MVList'
import CommentList from '@/components/commentList/commentList'

import {mapGetters, mapActions} from 'vuex'
export default {
  name: 'm-v-detail-page',
  data () {
    return {
      MV: {},
      comment: [],
      simi: [],
      offset: 0,
      limit: 20,
      reset: false,
      showControl: true
    }
  },
  components: {
    Loading, myVideo, Scroll, MVList, CommentList
  },
  computed: {
    ...mapGetters([
      'MVDetailShow',
      'MVDetailId'
    ])
  },
  methods: {
    ...mapActions([
      'closeMVDetailPage',
      'showMVDetailPage'
    ]),
    selectSimiItem (id) {
      this.$nextTick(() => {
        this.showMVDetailPage(id)
      })
    },
    initBottomHeight () {
      this.$nextTick(() => {
        let winH = document.documentElement.clientHeight
        let topH = this.$refs.top.offsetHeight
        this.$refs.bottom.style.height = winH - topH + 'px'
      })
    },
    pullingUp () {
      this.offset += this.limit
      getMVComment(this.MVDetailId, this.limit, this.offset).then((data) => {
        this.comment.push(data)
        this.$refs.scroll.forceUpdate()
      })
    },
    toggleControl (state) {
      this.showControl = state
    },
    close () {
      if (this.$refs.video) {
        this.$refs.video.close()
      }
      this.closeMVDetailPage()
    },
    resetting () {
      this.MV = {}
      this.comment = []
      this.simi = []
    }
  },
  watch: {
    MVDetailId () {
      this.resetting()
      getMVDetail(this.MVDetailId).then((data) => {
        if (data) {
          this.MV = data
        } else {
          this.MV = {}
        }
      })
      getMVSimi(this.MVDetailId).then((data) => {
        if (data) {
          this.simi = data
        } else {
          this.simi = []
        }
      })
      getMVComment(this.MVDetailId, this.limit, this.offset).then((data) => {
        console.log(data)
        if (data) {
          this.comment.push(data)
        } else {
          this.comment = []
        }
      })
    },
    MVDetailShow () {
      this.initBottomHeight()
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
    z-index: 30;
    .header {
      position: absolute;
      left: 0;
      top: 0;
      width: 100%;
      height: 1.38rem;
      line-height: 1.38rem;
      text-align:center;
      z-index: 1;
      background:linear-gradient(to bottom, #181818, transparent);
      display:flex;
      color: #fff;
      font-size: .6rem;
      .back,.share,.menu {
        flex: 1;
      }
      .titleName {
        width: 7rem;
        overflow:hidden;
        font-size: .48rem;
        text-align:left;
      }
    }
    .top {
      width: 100%;
    }
    .bottom {
      position: relative;
      overflow:hidden;
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
      .title {
        height: 1.62rem;
        font-size: .49rem;
        line-height: 1.62rem;
        overflow:hidden;
        .tag {
          display: inline-block;
          width: .65rem;
          height: .38rem;
          border: 1px solid #d33a31;
          line-height: .45rem;
          position: absolute;
          left: .31rem;
          top: .61rem;
          font-size: .23rem;
          text-align:center;
          color:#d33a31;
        }
        .name {
          text-indent: 1.14rem;
        }
      }
      .author {
        line-height: .5rem;
        font-size: .41rem;
        color: #507daf;
        text-indent: .32rem;
      }
      .publish {
        margin-top: .4rem;
        line-height: .5rem;
        font-size:.41rem;
        color: #919293;
        text-indent: .32rem;
      }
      .operation {
        margin-top: .35rem;
        height: 1.88rem;
        display:flex;
        text-align:center;
        .operationItem {
          margin-top: .46rem;
          font-size: .67rem;
          flex: 1;
          color: #494a4a;
          p {
            font-size: .26rem;
            line-height: .5rem;
            color: #919293;
          }
        }
      }
      .relative {
        height: .76rem;
        line-height: .76rem;
        background: #e7e9e9;
        color: #5c5d5d;
        font-size: .34rem;
        text-indent: .32rem;
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
