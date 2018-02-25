<template>
  <transition name="none">
    <div class="playerList" v-show="showFlag">
      <transition name="fade">
        <div class="mask" v-if="showFlag" @click="hide"></div>
      </transition>
      <transition name="slideUp">
        <div class="list-wrapper" v-if="showFlag" >
          <div class="list-header">
            <div class="mode" @click.stop="changeMode">
              <i :class="iconMode"></i>
              <span>{{modeText}}({{playerPlayList.length}})</span>
            </div>
            <div class="delete" @click.stop="deleteAll">
              <i class="icon-delete"></i>
            </div>
          </div>
          <div class="list-content">
            <scroll :data="playerPlayList" ref="listContent">
              <ul>
                <li ref="listItem" :class="{'active': item.id === playerCurrentSong.id}" class="item" v-for="(item,index) in playerPlayList" :key="index" @click="selectItem(index)">
                  <div class="medium" v-show="playerCurrentSong === item">
                    <i class="icon-volume-medium"></i>
                  </div>
                  <div class="name">
                    <span>{{musicName(item)}}</span>
                    <span class="author">-&nbsp;{{author(item)}}</span>
                  </div>
                  <div class="delete" @click.stop="deleteOne(item)">
                    <i class="icon-delete"></i>
                  </div>
                </li>
              </ul>
            </scroll>
          </div>
        </div>
      </transition>
    </div>
  </transition>
</template>

<script>
import {mapGetters, mapMutations, mapActions} from 'vuex'
import scroll from '@/components/scroll/scroll'
export default {
  name: 'player-list',
  components: {
    scroll
  },
  data () {
    return {
      showFlag: false
    }
  },
  methods: {
    show () {
      this.showFlag = true
      this.scrollToCurrent(this.playerCurrentSong)
    },
    hide () {
      this.showFlag = false
    },
    musicName (item) {
      return item.name
    },
    author (item) {
      let str = ''
      let nowItem = item
      for (let i = 0; i < nowItem.artists.length; i++) {
        str += nowItem.artists[i].name + '/'
      }
      str = str.slice(0, str.length - 1)
      return str
    },
    selectItem (index) {
      this.setCurrentIndex(index)
      this.setState(true)
    },
    scrollToCurrent (current) {
      this.$nextTick(() => {
        let index = this.playerPlayList.findIndex((song) => {
          return current.id === song.id
        })
        index = index - 3
        if (index < 0) {
          index = 0
        }
        this.$refs.listContent.scrollToElement(this.$refs.listItem[index], 300)
      })
    },
    deleteOne (item) {
      this.deleteSong(item)
    },
    deleteAll () {
      this.deleteSongList()
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
    ...mapMutations({
      'setCurrentIndex': 'SET_PLAYER_CURRENTINDEX',
      'setState': 'SET_PLAYER_STATE',
      'setPlayerMode': 'SET_PLAYER_MODE'
    }),
    ...mapActions([
      'deleteSong',
      'deleteSongList'
    ])
  },
  computed: {
    ...mapGetters([
      'playerPlayList',
      'playerCurrentSong',
      'playerMode'
    ]),
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
    },
    modeText () {
      if (this.playerMode === 'sequence') {
        return '顺序播放'
      }
      if (this.playerMode === 'loop') {
        return '单曲循环'
      }
      if (this.playerMode === 'random') {
        return '随机播放'
      }
      return ''
    }
  }
}
</script>

<style scoped lang="scss">
  .playerList {
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    position: absolute;
    z-index: 40;
    .mask {
      width: 100%;
      height: 100%;
      background-color: rgba(0,0,0,0.5);
    }
    .list-wrapper {
      position:absolute;
      width: 100%;
      bottom: 0;
      left: 0;
      height: 11.52rem;
      display:flex;
      flex-direction: column;
      background: #f3f3f3;
      padding-left: .3rem;
      .list-header{
        height: 1.5rem;
        width: 100%;
        font-size: .44rem;
        line-height: 1.5rem;
        display:flex;
        color: #313131;
        i {
          color: #929292;
        }
        .mode {
          span {
            margin-left: .24rem;
          }
        }
        .delete {
          position: absolute;
          top:0;
          right: 0;
          width: 1.05rem;
        }
      }
      .list-content{
        flex: 1;
        width: 100%;
        overflow:hidden;
        li {
          position: relative;
          display:flex;
          height: 1.37rem;
          line-height: 1.37rem;
          .name {
            width: 8.8rem;
            overflow:hidden;
            font-size: .42rem;
            color: #313131;
            .author {
              color: #7a7a7a;
              font-size: .28rem;
            }
          }
          .delete {
            position: absolute;
            top:0;
            right: 0;
            width: 1.05rem;
          }
          .medium {
            width: .64rem;
          }
        }
        li.active {
          .name,.medium,.author {
            color: #d33a31;
          }

        }
      }
    }
  }

  .slideUp-enter-active,.slideUp-leave-active {
    transition:all .4s;
  }
  .slideUp-enter,.slideUp-leave-active {
    transform: translateY(100%)
  }
  .none-enter-active,.none-leave-active {
    transition:all .4s;
  }
  .fade-enter-active,.fade-leave-active {
    transition:all .4s;
  }
  .fade-enter,.fade-leave-active {
    opacity: 0
  }
</style>
