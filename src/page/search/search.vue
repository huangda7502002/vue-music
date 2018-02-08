<template>
  <transition name="fadeUp" >
    <div class="search" v-show="searchShow">
      <div ref="header" class="header">
        <div class="back" @click="back">
          <i class="icon-back"></i>
        </div>
        <div class='searchBox'>
          <input v-model="inputString" type="text" @keyup.13="enter">
        </div>
      </div>
      <div ref="options" class="options">
        <ul ref="ul">
          <li class="optionItems active" @click="selectItem('music', $event)">单曲</li>
          <li class="optionItems" @click="selectItem('album', $event)">专辑</li>
          <li class="optionItems" @click="selectItem('singer', $event)">歌手</li>
          <li class="optionItems" @click="selectItem('musicList', $event)">歌单</li>
          <li class="optionItems" @click="selectItem('mv', $event)">MV</li>
        </ul>
      </div>
      <div ref="list" class="list">
        <scroll :data="list" v-if="list.length > 0">
          <component :tracks="list" :MVList="list" :playList="list" :singerList="list" :albumList="list" :is="which"></component>
        </scroll>
      </div>
    </div>
  </transition>

</template>

<script>
import getSearch from '@/api/getSearch'
import Music from '@/components/MusicList/MusicList'
import Mv from '@/components/MVList/MVList'
import scroll from '@/components/scroll/scroll'
import musicList from '@/components/playList/playList'
import singer from '@/components/singerList/singerList'
import album from '@/components/albumList/albumList'
import {mapActions, mapGetters} from 'vuex'

export default {
  name: 'search',
  components: {
    Music, scroll, Mv, musicList, singer, album
  },
  data () {
    return {
      which: 'music',
      inputString: '',
      offset: 0,
      limit: 100,
      type: '1',
      list: []
    }
  },
  computed: {
    ...mapGetters([
      'searchShow'
    ])
  },
  methods: {
    ...mapActions([
      'hideSearchPage'
    ]),
    selectItem (name, e) {
      let list = this.$refs.ul.children
      for (let i = 0; i < list.length; i++) {
        list[i].className = 'optionItems'
      }
      e.target.className = 'optionItems active'

      if (name === 'music') {
        this.type = '1'
      } else if (name === 'album') {
        this.type = '10'
      } else if (name === 'singer') {
        this.type = '100'
      } else if (name === 'musicList') {
        this.type = '1000'
      } else if (name === 'mv') {
        this.type = '1004'
      }
      this.search(name)
    },
    search (name) {
      getSearch(this.inputString, this.type, this.limit, this.offset, (data) => {
        if (data.code === 200) {
          if (this.type === '1') {
            this.list = data.result.songs
          } else if (this.type === '10') {
            this.list = data.result.albums
          } else if (this.type === '100') {
            this.list = data.result.artists
          } else if (this.type === '1000') {
            this.list = data.result.playlists
          } else if (this.type === '1004') {
            this.list = data.result.mvs
          }
          this.which = name
        }
      })
    },
    setListHeight () {
      let winH = document.documentElement.clientHeight
      let h1 = this.$refs.header.offsetHeight
      let h2 = this.$refs.options.offsetHeight
      let height = winH - h1 - h2 + 'px'
      this.$refs.list.style.height = height
    },
    enter () {
      let name = ''
      if (this.type === '1') {
        name = 'music'
      } else if (this.type === '10') {
        name = 'album'
      } else if (this.type === '100') {
        name = 'singer'
      } else if (this.type === '1000') {
        name = 'musicList'
      } else if (this.type === '1004') {
        name = 'mv'
      }
      this.search(name)
    },
    back () {
      this.hideSearchPage()
    }
  },
  mounted () {
    this.setListHeight()
  }
}
</script>

<style lang="scss" scoped>
 .search {
   position: absolute;
   left: 0;
   top: 0;
   width: 100%;
   height: 100%;
   background: #fff;
   z-index: 10;
   .header {
     height: 1.57rem;
     width: 100%;
     background: #d33a31;
     display:flex;
     .back {
       width: 1.67rem;
       height: 100%;
       text-align:center;
       font-size: .57rem;
       color: #fff;
       padding-top: .51rem;
       box-sizing: border-box;
     }
     .searchBox {
       flex: 1;
       height: 100%;
       input {
         width: 8.89rem;
         border:none;
         background:transparent;
         height: 1rem;
         border-bottom: .03rem solid #e0756f;
         margin-top: .25rem;
         outline:none;
         font-size: .49rem;
         color: #f2c4c1;
       }
     }
   }
   .options {
     height: 1.14rem;
     line-height: 1.14rem;
     width: 100%;
     text-align:center;
     font-size: .41rem;
     color:#666;
     ul {
       display:flex;
       .optionItems {
         flex: 1;
         position: relative;
       }
       .optionItems.active {
         color: #d33a31;
       }
       .optionItems.active::after {
         position:absolute;
         content: '';
         height: .06rem;
         background: #d33a31;
         width: 100%;
         left: 0;
         bottom: 0;
       }
     }
   }
   .list {
     background: #f2f4f5;
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
