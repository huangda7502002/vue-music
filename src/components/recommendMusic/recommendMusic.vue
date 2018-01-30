<template>
  <div id="recommendMusic" v-if="musicList.length !== 0">
    <div class="title">
      {{titleName}}
      <i class="icon icon-right"></i>
    </div>
    <div class="content">
      <ul>
        <li v-for="(item,index) in musicList" :key="index" @click="showMusicListDetail(item.id)">
          <img :src="item.picUrl" alt="">
          <p>{{item.name}}</p>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import {mapActions} from 'vuex'
export default {
  name: 'recommend-music',
  props: {
    titleName: {
      type: String,
      'default': ''
    },
    musicList: {
      type: Array,
      'default': []
    }
  },
  data () {
    return {
    }
  },
  methods: {
    ...mapActions([
      'showMusicListDetail'
    ])
  }
}
</script>

<style lang="scss" scoped>
  #recommendMusic {
    margin-top: .7rem;
    .title {
      height: .45rem;
      line-height: .45rem;
      font-size: .45rem;
      border-left: .06rem solid #d33a31;
      text-indent: .2rem;
      margin-bottom: .45rem;
      color: #303131;
      .icon {
        color: #919293
      }
    }
    .content {
      height: 10.5rem;
      width: 100%;
      overflow:hidden;
      ul {
        li {
          width:33.33%;
          float:left;
          height:5.25rem;
          box-sizing: border-box;
          padding-left:1px;
          padding-right:1px;
          img {
            width: 100%;
          }
          p {
            height: 1.0rem;
            font-size: .37rem;
            line-height: .54rem;
            padding-top: .15rem;
            padding-left:.2rem;
            display: -webkit-box;
            -webkit-box-orient: vertical;
            -webkit-line-clamp: 2;
            overflow: hidden;
            word-break:break-all;
          }
        }
        li:nth-child(3n+1) {
          padding-left:0px;
          padding-right: 1px;
        }
        li:nth-child(3n) {
          padding-left: 1px;
          padding-right: 0px;
        }
      }
    }
  }
</style>
