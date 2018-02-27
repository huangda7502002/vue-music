<template>
  <div class="player" v-if="playerPlayList.length > 0">
    <transition name="normal">
      <div class="normal-player" v-show="playerFullScreen">
        <img class="background" :src="backgroundImage" @load="backgroundLoaded" :class="{'background-active':backgroundActive}" >
        <div class="mask"></div>
        <div class="top">
          <div class="back" @click="back">
            <i class="icon-back"></i>
          </div>
          <div class="title">
            <p class="musicName">{{musicName}}</p>
            <p class="author">
              {{author}}
            </p>
          </div>
          <div class="share">
            <i class="icon-share"></i>
          </div>
        </div>
        <div class="middle">
          <transition name="fade">
            <div v-show="!showLyric" class="player-cd">
              <div class="triger" :class="{'triger-paused': !playerState}">
                <img src="./triger.png" alt="">
              </div>
              <div @click="toggleLyric" class="cd animate-rotate" :class="{'animate-paused': !playerState}">
                <img class="albumImg" :src="albumImg" alt="">
                <img class="cdImg" src="./cd.png" alt="">
              </div>
              <div class="select">
                <div class="selectItem">
                  <i class="icon-like"></i>
                </div>
                <div class="selectItem">
                  <i class="icon-download"></i>
                </div>
                <div class="selectItem">
                  <i class="icon-msg"></i>
                </div>
                <div class="selectItem">
                  <i class="icon-list-circle-small"></i>
                </div>
              </div>
            </div>
          </transition>

          <transition name="fade">
            <div v-show="showLyric" class="lyric" @click="toggleLyric">
              <scroll ref="lyricList" :data="currentLyric">
                <div class="lyric-wrapper">
                  <div v-if="currentLyric">
                    <p ref="lyricLine"
                       class="text"
                       :class="{'currentLine':currentLineNum === index}"
                       v-for="(line,index) in currentLyric.lines"
                       :key="index">{{line.txt}}</p>
                  </div>
                  <div v-if="!currentLyric" class="nolyric">
                    暂时没有歌词
                  </div>
                </div>
              </scroll>
            </div>
          </transition>
        </div>
        <div class="bottom">
          <div class="progress">
            <span class="time-left">
              {{format(currentTime)}}
            </span>
            <div class="time-center">
              <my-progress @progressMove="progrssMove" @percentChange="progressChange" :percent="percent"></my-progress>
            </div>
            <span class="time-right">
              {{format(duration)}}
            </span>
          </div>
          <div class="controls">
            <ul>
              <li @click="changeMode" class="mode">
                <i :class="iconMode"></i>
              </li>
              <li class="prev" @click="prev">
                <i class="icon-prevdetail"></i>
              </li>
              <li class="play" @click="togglePlayerState">
                <i :class="playIcon"></i>
              </li>
              <li class="next" @click="next">
                <i class="icon-nextdetail"></i>
              </li>
              <li class="list" @click="showPlayerList">
                <i class="icon-list-music"></i>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </transition>

    <div class="mini-player" v-show="!playerFullScreen">
      <div @click="open" class="photo">
        <img :src="backgroundImage" alt="">
      </div>
      <div @click="open" class="desc">
        <p>{{musicName}}</p>
        <p>{{author}}</p>
      </div>
      <div @click="togglePlayerState" class="play">
        <i :class="playIcon"></i>
      </div>
      <div class="menu">
        <i class="icon-list-music" @click="showPlayerList"></i>
      </div>
    </div>
    <player-list ref="playerList"></player-list>
    <audio autoplay ref="audio" @ended="end" @timeupdate="updateTime" @error="audioError" @canplay="audioReady" :src="musicUrl"></audio>

  </div>
</template>

<script>
import {mapGetters, mapMutations} from 'vuex'
import MyProgress from '@/base/progress/progress'
import ProgressCircle from '@/base/progress-circle/progress-circle'
import getLyric from '@/api/getLyric'
import Lyric from '@/common/js/Lyric'
import Scroll from '@/components/scroll/scroll'
import playerList from '@/components/playerList/playerList'

export default {
  name: 'player',
  data () {
    return {
      songReady: false,
      currentTime: 0,
      Move: false,
      currentLyric: null,
      backgroundActive: false,
      showLyric: false,
      currentLineNum: 0
    }
  },
  components: {
    MyProgress, ProgressCircle, Scroll, playerList
  },
  methods: {
    getCurrentSongLyric () {
      let id = this.playerCurrentSong.id
      getLyric(id, (data) => {
        if (data.code === 200) {
          if (this.currentLyric) {
            this.currentLyric.stop()
          }
          this.currentLyric = new Lyric(data.lrc.lyric, this.handleLyric)
          if (this.playerState) {
            this.currentLyric.play()
            this.currentLyric.stop()
          }
        } else {
          this.currentLyric = null
          this.currentLineNum = 0
        }
      })
    },
    handleLyric ({lineNum, text}) {
      this.currentLineNum = lineNum
      if (lineNum > 4) {
        let lineEl = this.$refs.lyricLine[lineNum - 4]
        this.$refs.lyricList.scrollToElement(lineEl, 1000)
      } else {
        this.$refs.lyricList.scrollTo(0, 0, 1000)
      }
    },
    toggleLyric () {
      if (this.showLyric) {
        this.showLyric = false
      } else {
        this.showLyric = true
        this.$refs.lyricList.refresh()
      }
    },
    backgroundLoaded () {
      this.backgroundActive = true
    },
    togglePlayerState () {
      if (!this.songReady) {
        return
      }
      if (this.playerState) {
        this.setPlayerState(false)
      } else {
        this.setPlayerState(true)
      }
    },
    progressChange (percent) {
      this.$refs.audio.currentTime = this.duration * percent
      this.Move = false
      if (!this.playerState) {
        this.togglePlayerState()
      }
      if (this.currentLyric) {
        this.currentLyric.seek(this.duration * percent * 1000)
        this.currentLyric.stop()
      }
    },
    progrssMove (percent) {
      this.Move = true
      this.currentTime = this.duration * percent

      if (this.currentLyric) {
        this.currentLyric.seek(this.duration * percent * 1000)
        this.currentLyric.stop()
      }
    },
    prev () {
      if (!this.songReady) {
        return
      }
      if (this.playerPlayList.length === 0) {
        return
      }
      if (this.playerPlayList.length === 1) {
        this.$refs.audio.currentTime = 0
        this.getCurrentSongLyric()
        if (!this.playerState) {
          this.togglePlayerState()
        }
        return
      }

      let index = this.playerCurrentIndex - 1
      if (index === -1) {
        index = this.playerPlayList.length - 1
      }
      this.setCurrentIndex(index)
      if (!this.playerState) {
        this.togglePlayerState()
      }
      this.songReady = false
    },
    next () {
      if (!this.songReady) {
        return
      }
      if (this.playerPlayList.length === 1) {
        this.$refs.audio.currentTime = 0
        if (!this.playerState) {
          this.togglePlayerState()
        }
        this.getCurrentSongLyric()
        return
      }

      let index = this.playerCurrentIndex + 1
      if (index === this.playerPlayList.length) {
        index = 0
      }
      this.setCurrentIndex(index)
      if (!this.playerState) {
        this.togglePlayerState()
      }
      this.songReady = false
    },
    back () {
      this.setFullScreen(false)
    },
    open () {
      this.setFullScreen(true)
    },
    end () {
      let index = 0
      if (this.playerMode === 'random') {
        index = Math.floor(Math.random() * this.playerPlayList.length)
        this.setCurrentIndex(index)
      }
      if (this.playerMode === 'sequence') {
        this.next()
      }
      if (this.playerMode === 'loop') {
        this.$refs.audio.currentTime = 0
        this.$refs.audio.play()

        if (this.currentLyric) {
          this.currentLyric.seek(0)
          this.currentLyric.stop()
        }
      }
    },
    audioReady () {
      this.songReady = true
    },
    audioError () {
      this.songReady = true
    },
    updateTime (e) {
      if (!this.Move) {
        this.currentTime = e.target.currentTime
        if (this.currentLyric) {
          this.currentLyric.seek(this.currentTime * 1000)
          this.currentLyric.stop()
        }
      }
    },
    format (interval) {
      let minute = Math.floor(interval / 60) | 0
      let second = Math.floor(interval % 60) | 0
      minute = minute < 10 ? '0' + minute : minute
      second = second < 10 ? '0' + second : second
      return `${minute}:${second}`
    },
    changeMode () {
      let mode = ''
      if (this.playerMode === 'sequence') {
        mode = 'random'
      }
      if (this.playerMode === 'random') {
        mode = 'loop'
      }
      if (this.playerMode === 'loop') {
        mode = 'sequence'
      }
      this.setPlayerMode(mode)
    },
    showPlayerList () {
      this.$refs.playerList.show()
    },
    hidePlayerList () {
      this.$refs.playerList.hide()
    },
    ...mapMutations({
      setFullScreen: 'SET_PLAYER_FULLSCREEN',
      setPlayerState: 'SET_PLAYER_STATE',
      setCurrentIndex: 'SET_PLAYER_CURRENTINDEX',
      setPlayerMode: 'SET_PLAYER_MODE'
    })
  },
  computed: {
    ...mapGetters([
      'playerFullScreen',
      'playerPlayList',
      'playerCurrentIndex',
      'playerState',
      'playerCurrentSong',
      'playerMode'
    ]),
    backgroundImage () {
      return this.playerPlayList[this.playerCurrentIndex].album.blurPicUrl
    },
    musicName () {
      return this.playerPlayList[this.playerCurrentIndex].name
    },
    author () {
      let str = ''
      let nowItem = this.playerPlayList[this.playerCurrentIndex]
      for (let i = 0; i < nowItem.artists.length; i++) {
        str += nowItem.artists[i].name + '/'
      }
      str = str.slice(0, str.length - 1)
      return str
    },
    albumImg () {
      return this.playerPlayList[this.playerCurrentIndex].album.picUrl
    },
    musicUrl () {
      let musicId = this.playerPlayList[this.playerCurrentIndex].id
      let Url = `http://music.163.com/song/media/outer/url?id=${musicId}.mp3`

      return Url
    },
    playIcon () {
      return this.playerState ? 'icon-pause-detail' : 'icon-playdetail'
    },
    duration () {
      return this.playerCurrentSong.duration / 1000
    },
    percent () {
      return this.currentTime / this.playerCurrentSong.duration * 1000
    },
    iconMode () {
      if (this.playerMode === 'sequence') {
        return 'icon-music-shunxu'
      }
      if (this.playerMode === 'loop') {
        return 'icon-music-danqu1'
      }
      if (this.playerMode === 'random') {
        return 'icon-music-random'
      }
      return ''
    }
  },
  watch: {
    playerState (state) {
      this.$nextTick(() => {
        let audio = this.$refs.audio
        if (!audio) {
          return
        }
        if (state) {
          audio.play()
        } else {
          audio.pause()
        }
      })
    },
    playerCurrentSong (song, oldsong) {
      if (!song) {
        return
      }
      if (oldsong && song.album.id !== oldsong.album.id) {
        this.backgroundActive = false
      }
      if (this.currentLyric) {
        this.currentLyric.stop()
      }
      this.getCurrentSongLyric()
    }
  }
}
</script>

<style lang="scss" scoped>
  .player {
    .normal-player {
      position: fixed;
      left: 0;
      right: 0;
      bottom:  0;
      top: 0;
      z-index: 30;
      display:flex;
      flex-direction: column;
      background: #161616;
      .background{
        display:block;
        position: fixed;
        left: 0;
        right: 0;
        bottom: 0;
        top: 0;
        background-size: cover;
        background-position: 50%;
        transform: scale(1.5);
        background-repeat: no-repeat;
        filter:blur(30px);
        opacity: 0;
      }
      .background-active {
        transition: all 1s;
        opacity: 1;
      }
      .mask {
         content: '';
         position: absolute;
         left: 0;
         right: 0;
         bottom: 0;
         top: 0;
         background-color: rgba(0,0,0,.5)
       }

      .top,.middle,.bottom {
        position: relative;
      }
      .top {
        flex: 1;
        box-sizing: border-box;
        padding: .22rem 0;
        display:flex;
        .back,.share {
          flex: 1;
          padding-top: .25rem;
          text-align:center;
          font-size: .66rem;
          color: #fff;
        }
        .share {
          font-size: .83rem;
        }
        .title {
          flex: 4.5;
          overflow: hidden;
          white-space: nowrap;
          text-overflow: ellipsis;
          .musicName {
            color: #fff;
            font-size: .48rem;
            margin-top: .1rem;
            margin-bottom: .13rem;
          }
          .author {
            color: #888;
            font-size: .4rem;
          }
        }

      }
      .middle {
        flex: 8.64;
        position: relative;
        overflow:hidden;
        .player-cd {
          position: absolute;
          width: 100%;
          height: 100%;
        }
        .triger {
          position: absolute;
          height: 4.20rem;
          top: -.48rem;
          margin-left: -.6rem;
          left: 50%;
          z-index: 10;
          img {
            height: 100%;
          }
        }
        .cd {
          width: 8.15rem;
          height: 8.15rem;
          margin: 0 auto;
          margin-bottom: 1.86rem;
          margin-top: 1.86rem;
          border-radius: 50%;
          position: relative;
          .cdImg {
            width: 100%;
            height: 100%;
            position:relative;
          }
          .albumImg {
            position: absolute;
            top: 1.43rem;
            left: 1.43rem;
            width: 5.3rem;
            height: 5.3rem;
            margin:0 auto;
          }
        }
        .select {
          position: absolute;
          bottom: 0;
          left: 0;
          width: 100%;
          height: 1.32rem;
          padding: 0 1.1rem;
          box-sizing: border-box;
          display:flex;
          .selectItem {
            flex: 1;
            text-align:center;
            color:#fff;
            line-height: 1.32rem;
            font-size: .72rem;
          }
        }
        .lyric {
          position: absolute;
          width: 100%;
          height: 100%;
          left: 0;
          top: 0;
          .lyric-wrapper {
            text-align:center;
            .text {
              padding: .44rem 1.05rem;
              color: #818a8d;
              font-size: .44rem;
            }
            .currentLine {
              color: #fff;
            }
            .nolyric {
              font-size: .5rem;
            }
          }
        }

      }
      .bottom {
        flex: 2.35;
        .progress {
          padding: 0 .43rem;
          height: 1.22rem;
          display:flex;
          .time-left,.time-right {
            flex: 1;
            line-height: 1.22rem;
            text-align:center;
            color: #bab9b8;
          }
          .time-center {
            flex: 5.8;
            margin-top: .44rem;
          }
        }
        .controls ul{
          display: flex;
          line-height: 1.86rem;
          color: #fff;
          font-size: .71rem;
          li {
            flex: 1;
            text-align:center;
          }
          .prev,.next {
            font-size: 1rem;
          }
          .play {
            font-size: 1.3rem;
          }
        }
      }
    }
    .mini-player {
      position: fixed;
      left: 0;
      width: 100%;
      bottom: 0;
      background: #fff;
      height: 1.47rem;
      padding: .16rem;
      box-sizing: border-box;
      display:flex;
      z-index: 25;
      .photo {
        width: 1.12rem;
        height: 1.12rem;
        img {
          width: 100%;
          height: 100%;
        }
      }
      .desc {
        flex: 5.9;
        padding-left: .2rem;
        font-size: .4rem;
        color: #333;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
        p {
          margin-top: .14rem;

        }
        p:last-child {
          font-size: .34rem;
          color: #7d7d7d;
        }

      }
      .play,.menu {
        font-size: .83rem;
        text-align:center;
        line-height: 1.37rem;
        flex: 1;
      },
    .menu {
      font-size: .63rem;
    }
    }
  }

  .normal-enter-active, .normal-leave-active {
    transition: all .4s;
  }
  .normal-enter,.normal-leave-to {
    opacity: 0;
    transform:translateY(1rem);
  }

  @keyframes rotate {
    0% {
      transform: rotate(0deg)
    }
    100% {
      transform: rotate(360deg)
    }
  }

  .triger {
    transition: all .8s;
    transform-origin: .48rem .476rem;
  }
  .triger-paused {
    transform: rotate(-28deg);
  }

  .animate-rotate {
    animation: rotate 25s linear infinite
  }
  .animate-paused {
    animation-play-state: paused;
  }
  .fade-enter-active,.fade-leave-active {
    transition: all .5s;
  }
  .fade-leave-active, .fade-enter {
    opacity: 0;
  }

</style>
