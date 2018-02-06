<template>
  <div id="videoPage">
    <scroll ref="scroll" @pullingUp="pullingUp" :pullUpLoad="{threshold: 200}" @pullingDown="pullingDown" :pullDownRefresh="{threshold: 50,stop: 0}" :data="topMVList">
      <div class="video">
        <div v-for="(item,index) in topMVList" class="videoContent" :key="index">
          <my-video class="video" :videoDetail="item.data"></my-video>

          <div class="panel">
            <div class="text">
              <p class="name">{{item.data.name}}</p>
              <p class="artist">{{item.data.artistName}}</p>
            </div>
            <div class="control">
              <p>
                <i class="icon-like"></i><br>
                <span>{{item.data.likeCount}}</span>
              </p>
              <p>
                <i class="icon-msg"></i><br>
                <span>{{item.data.commentCount}}</span>
              </p>
              <p>
                <i class="icon-list-circle-small"></i>
              </p>
            </div>
          </div>
        </div>
      </div>
    </scroll>
  </div>
</template>

<script>
import myVideo from '@/base/myVideo/myVideo'
import {mapActions, mapGetters} from 'vuex'
import getMVDetail from '@/api/getMVDetail'
import Scroll from '@/components/scroll/scroll'
export default {
  name: 'video-page',
  data () {
    return {
      limit: 5,
      offset: 0,
      topMVList: [],
      isPullingDown: false,
      isPullingUp: false
    }
  },
  methods: {
    ...mapActions([
      'getTopMV'
    ]),
    pullingDown () {
      this.isPullingDown = true
      this.offset = this.offset + this.limit
      this.getTopMV({
        'limit': this.limit,
        'offset': this.offset
      })
    },
    pullingUp () {
      this.isPullingUp = true
      this.offset = this.offset + this.limit
      this.getTopMV({
        'limit': this.limit,
        'offset': this.offset
      })
    }
  },
  computed: {
    ...mapGetters([
      'topMV'
    ])
  },
  components: {
    myVideo, Scroll
  },
  mounted () {
    this.getTopMV({
      'limit': this.limit,
      'offset': this.offset
    })
  },
  watch: {
    topMV () {
      let arr = []
      for (let i = 0; i < this.topMV.length; i++) {
        arr[i] = getMVDetail(this.topMV[i].id)
      }
      Promise.all(arr).then((result) => {
        if (this.isPullingDown) {
          this.$refs.scroll.forceUpdate()
          if (result.length !== 0) {
            this.topMVList = []
          }
          this.isPullingDown = false
        }
        if (this.isPullingUp) {
          this.$refs.scroll.forceUpdate()
          this.isPullingUp = false
        }
        this.topMVList = this.topMVList.concat(result)
      })
    }
  }
}
</script>

<style lang="scss" scoped>
  #videoPage {
    padding-top: 1.15rem;
    .video {
      width: 100%;
    }
    .panel {
      height: 2.18rem;
      display:flex;
      .text {
        width: 6.5rem;
        padding-top: .3rem;
        padding-left: .27rem;
        line-height: .65rem;
        font-size: .42rem;
        color: #303131;
        p {
          width: 100%;
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
        }
        .artist {
          font-size: .37rem;
          color: #797a7b;
        }
      }
      .control {
        flex: 1;
        display: flex;
        p {
          flex: 1;
          text-align:center;
          padding-top: .47rem;
          box-sizing: border-box;
          span {
            line-height: .6rem;
            color: #919293;
            font-size: .24rem;
          }
        }
        p:last-child {
          padding-top: .7rem;
        }
        i {
          font-size: .6rem;
          color: #616262;
        }
      }
    }
  }

</style>
