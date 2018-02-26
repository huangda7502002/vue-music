<template>
  <transition name="fadeUp">
    <div class="musicListDetailPage"  v-show="musicListDetail.show">
      <div class="loading" v-if="!musicListDetail.showList.id">
        <loading></loading>
        &nbsp;努力加载中...
      </div>
      <div class="background"  :style="'background-image: url(' + coverImgUrl + ')' " v-if="musicListDetail.showList.id"></div>
      <div class="top">
        <div class="back" @click="back">
          <i class="icon-back"></i>
        </div>
        <div class="text">
          <p>歌单</p>
          <p>{{musicListDetail.copywriter}}</p>
        </div>
        <div class="search">
          <i class="icon-search"></i>
        </div>
        <div class="more">
          <i class="icon-list-circle-small"></i>
        </div>
      </div>
      <b-scroll :data="musicListDetail.showList" class="scrollView" v-if="musicListDetail.showList.id">
        <div class="content">
          <div class="author">
            <img :src="coverImgUrl" alt="">
            <div class="listName">
              <p class="listTitle">{{name}}</p>
              <p class="avatar">
                <img :src="avatarUrl" alt="">
                <span>{{nickName}}</span>
                <i class="icon-right"></i>
              </p>
            </div>
            <div class="operation">
              <div class="operationItem">
                <i class="icon-music"></i><br>
                <span>{{subscribedCount}}</span>
              </div>
              <div class="operationItem">
                <i class="icon-msg"></i><br>
                <span>{{commentCount}}</span>
              </div>
              <div class="operationItem">
                <i class="icon-share"></i><br>
                <span>{{shareCount}}</span>
              </div>
              <div class="operationItem">
                <i class="icon-download"></i><br>
                <span>下载</span>
              </div>
            </div>
          </div>
          <div class="play">
            <div class="playpause" @click="playAll">
              <i class="icon-playdetail" ></i>
            </div>
            <p class="playall" @click="playAll">
              播放全部
              <span class="trackCount">(共{{trackCount}}首)</span>
            </p>
            <i class="icon-menu"></i>
            <p class="choose">多选</p>
          </div>
          <music-list @selected="selectItem"  :tracks="musicListDetail.showList.tracks"></music-list>
        </div>
      </b-scroll>
    </div>
  </transition>

</template>

<script>
import {mapGetters, mapActions} from 'vuex'
import MusicList from '@/components/MusicList/MusicList'
import BScroll from '@/components/scroll/scroll'
import Loading from '@/base/loading/loading'

export default {
  name: 'music-list-detail-page',
  components: {
    MusicList, BScroll, Loading
  },
  methods: {
    selectItem (item, index) {
      this.selectPlay({
        list: this.musicListDetail.showList.tracks,
        index: index
      })
    },
    playAll () {
      this.randomPlay(this.musicListDetail.showList.tracks)
    },
    back () {
      this.hideMusicListDetail()
    },
    ...mapActions([
      'selectPlay',
      'randomPlay',
      'hideMusicListDetail'
    ])
  },
  computed: {
    ...mapGetters([
      'musicListDetail'
    ]),
    avatarUrl () {
      if (this.musicListDetail.length !== 0) {
        return this.musicListDetail.showList.creator.avatarUrl
      }
    },
    nickName () {
      if (this.musicListDetail.length !== 0) {
        return this.musicListDetail.showList.creator.nickname
      }
    },
    backgroundUrl () {
      if (this.musicListDetail.length !== 0) {
        return this.musicListDetail.showList.creator.backgroundUrl
      }
    },
    coverImgUrl () {
      if (this.musicListDetail.length !== 0) {
        return this.musicListDetail.showList.coverImgUrl
      }
    },
    shareCount () {
      if (this.musicListDetail.length !== 0) {
        return this.musicListDetail.showList.shareCount
      }
    },
    commentCount () {
      if (this.musicListDetail.length !== 0) {
        return this.musicListDetail.showList.commentCount
      }
    },
    subscribedCount () {
      if (this.musicListDetail.length !== 0) {
        return this.musicListDetail.showList.subscribedCount
      }
    },
    name () {
      if (this.musicListDetail.length !== 0) {
        return this.musicListDetail.showList.name
      }
    },
    trackCount () {
      if (this.musicListDetail.length !== 0) {
        return this.musicListDetail.showList.trackCount
      }
    }
  }
}
</script>

<style lang="scss" scoped>
  .musicListDetailPage {
    z-index: 20;
    position: absolute;
    top: 0;
    left: 0;
    bottom: 0;
    right: 0;
    padding-top: 1.55rem;
    color: #fff;
    background-color: #f2f4f5;
    .background {
      position: absolute;
      left:0;
      top: 0;
      width: 100%;
      height: 50%;
      background-size: cover;
      background-position: 50%;
      transform: scale(1.5);
      filter: blur(20px);
      &::after {
        position: absolute;
        width: 100%;
        height: 100%;
        content: '';
        background: rgba(0,0,0,0.45);
      }
    }
    .loading {
      width: 100%;
      display: flex;
      justify-content: center;
      align-items: center;
      padding: 16px 0;
      color: #333;
    }
    .top {
      position: fixed;
      top: 0px;
      left: 0px;
      right: 0px;
      height: 1.55rem;
      font-size: .65rem;
      display:flex;
      color: #fff;
      .text {
        font-size: .5rem;
        color: #fff;
        padding: .27rem 0;
        text-align:left;
        p:first-child {
          line-height: .7rem;
        }
        p:last-child {
          line-height: .3rem;
          color: #7c7976;
          font-size: .3rem;
        }
      }

      & > div {
        flex: 1;
        line-height: 1.55rem;
        text-align:center;
      }
      & > div:first-child {
        flex: 1.2;
      }
      & > div:nth-child(2) {
        flex: 4.8;
      }
    }
    .scrollView {
      width: 100%;
      height: 100%;
    }
    .content {
      position: relative;
      .author {
        height: 5.91rem;
        padding: 0 .66rem;
        position: relative;
        & > img {
          width: 3.79rem;
          height: 3.79rem;
          margin-right: .55rem;
          margin-bottom: .37rem;
        }
        .listName {
          width: 5rem;
          position: absolute;
          top: 0;
          left: 5.03rem;
          line-height: .7rem;
          font-size: .5rem;
          .listTitle {
            margin-top: .2rem;
            margin-bottom: .5rem;
          }
          .avatar {
            line-height: .8rem;
            font-size: .4rem;
            color:#cdcbcb;
            display:flex;
            span {
              padding-left: .19rem;
            }
            i {
              line-height: .8rem;
            }
            img {
              border-radius: 50%;
              width: .8rem;
              height: .8rem;
            }
          }
        }
        .operation {
         display:flex;
         .operationItem {
           flex: 1;
           text-align:center;
           padding: .35rem 0;
           font-size: .4rem;
           i {
             font-size: .65rem;
           }
         }
       }
      }
      .play {
        height: 1.48rem;
        width: 100%;
        line-height: 1.48rem;
        background: #f2f4f5;
        color: #303031;
        display:flex;
        text-align:center;
        font-size: .41rem;
        border-bottom: 1px solid #e7e9e9;
        .playpause {
          width: 1.51rem;
          line-height: 1.51rem;
          font-size: .65rem;
        }
        .playall {
          width: 7.6rem;
          text-align:left;
          .trackCount {
            color: #919293;
          }
        }
        .icon-menu {
          width: .5rem;
          line-height: 1.48rem;
        }
        .choose {
          width: 1.15rem;
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
