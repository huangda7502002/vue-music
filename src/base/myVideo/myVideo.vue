<template>
  <div class="myVideo" v-if="videoDetail">
    <div class="video" @click="toggleControl">
      <video :poster="cover" @timeupdate="updateTime" ref="video" :src="url"></video>
      <i v-show=" (showControl || firstClick === true)" @click.stop="togglePlayState" :class="playIcon" class="play"></i>
    </div>
    <div v-show="showControl" class="control">
      <div class="time">
        <span>{{format(currentTime)}}</span>
        <span>/</span>
        <span class="duration">{{format(duration / 1000)}}</span>
      </div>
      <div class="fullscreen">
        <i class="icon-fullscreen"></i>
      </div>
    </div>
    <div class="progress">
      <my-progress v-show="!firstClick" :showBtn="showControl" :bufferPercent="bufferPercent" :percent="percent"></my-progress>
    </div>
  </div>
</template>

<script>
import MyProgress from '@/base/progress/progress'
export default {
  name: 'my-video',
  props: {
    videoDetail: {
      type: Object,
      'default': null
    }
  },
  components: {
    MyProgress
  },
  data () {
    return {
      showControl: false,
      playState: false,
      currentTime: 0,
      bufferTime: 0,
      firstClick: true
    }
  },
  methods: {
    togglePlayState () {
      if (this.playState) {
        this.playState = false
      } else {
        this.playState = true
      }
      this.firstClick = false
    },
    updateTime (e) {
      this.currentTime = e.target.currentTime
      if (e.target.buffered.length >= 1) {
        this.bufferTime = e.target.buffered.end(0)
      } else {
        this.bufferTime = 0
      }
    },
    toggleControl () {
      if (this.showControl) {
        this.showControl = false
      } else {
        this.showControl = true
      }
    },
    format (interval) {
      let minute = Math.floor(interval / 60) | 0
      let second = Math.floor(interval % 60) | 0
      minute = minute < 10 ? '0' + minute : minute
      second = second < 10 ? '0' + second : second
      return `${minute}:${second}`
    }
  },
  computed: {
    playIcon () {
      if (this.playState) {
        return 'icon-pause-detail'
      } else {
        return 'icon-playdetail'
      }
    },
    percent () {
      return this.currentTime / this.duration * 1000
    },
    bufferPercent () {
      return this.bufferTime / this.duration * 1000
    },
    duration () {
      return this.videoDetail.duration
    },
    cover () {
      return this.videoDetail.cover
    },
    url () {
      if (this.videoDetail.brs['240']) {
        return this.videoDetail.brs['240']
      }
      if (this.videoDetail.brs['480']) {
        return this.videoDetail.brs['480']
      }
      if (this.videoDetail.brs['720']) {
        return this.videoDetail.brs['720']
      }
      if (this.videoDetail.brs['1080']) {
        return this.videoDetail.brs['1080']
      }
    }
  },
  watch: {
    playState (state) {
      if (state) {
        this.$refs.video.play()
      } else {
        this.$refs.video.pause()
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.myVideo {
  width: 100%;
  position:relative;
  .control {
    position: absolute;
    left: 0;
    bottom: .06rem;
    width: 100%;
    height: 1.38rem;
    background:linear-gradient(to top, black, transparent);
    .time {
      color: #fff;
      text-indent: .28rem;
      line-height: 1.38rem;
      .duration {
        color: #b2b2b2;
      }
    }
    .fullscreen {
      position: absolute;
      right: .5rem;
      bottom: .46rem;
      font-size: .5rem;
      color: #fff;
    }

  }
  .video {
    width: 100%;
    position: relative;
    .play,.loading {
      font-size: 1.48rem;
      position: absolute;
      left: 50%;
      top: 50%;
      margin-top: -.74rem;
      margin-left: -.74rem;
      color:#dfd6d8;
    }
    video {
      width: 100%;
    }
  }
  .progress{
    position: absolute;
    bottom: 0;
    left: 0;
    width: 100%;
    /deep/ .grogress-bar {
      padding: 0;
      height: auto;
      background: #ccc;
      .bar-inner {
        top: -.06rem;
        .grogress-btn-wrapper {
          width: .36rem;
          height: .36rem;
          background-color: #d33a31;
        }
      }

    }
  }

  .slideUp-leave-active, .slideUp-enter-active{
    transition: all .3s;
  }
  .slideUp-leave-active,.slideUp-enter {
    opacity: 0;
    transform: translateY(50%);
  }
}
</style>
