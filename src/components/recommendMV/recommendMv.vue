<template>
  <div id="recommendMV" v-if="MVList.length !== 0">
    <div class="title">
      {{titleName}}
      <i class="icon icon-right"></i>
    </div>
    <div class="content">
      <ul>
        <li v-for="(item,index) in MVList" :key="index" @click="selectMVItem(item.id)">
          <img :src="item.picUrl" alt="">
          <div class="artist">
            <p class="name">{{item.name}}</p>
            <p class="artistName">{{item.artistName}}</p>
          </div>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import {mapActions} from 'vuex'
export default {
  name: 'recommend-mv',
  props: {
    titleName: {
      type: String,
      'default': ''
    },
    MVList: {
      type: Array,
      'default': []
    }
  },
  methods: {
    ...mapActions([
      'showMVDetailPage'
    ]),
    selectMVItem (id) {
      this.showMVDetailPage(id)
    }
  }
}
</script>

<style lang="scss" scoped>
  #recommendMV {
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
      overflow: hidden;
      ul {
        li {
          width: 50%;
          float: left;
          height: 4.69rem;
          box-sizing: border-box;
          img {
            width: 100%;
            height: 3.02rem;
          }
          .artist {
            padding-top: .15rem;
            padding-left:.2rem;
            font-size: .37rem;
            line-height: .54rem;
            .name,.artistName {
              overflow: hidden;
              text-overflow:ellipsis;
              white-space: nowrap;
            }
            .artistName {
              color: #888;
            }
          }
        }
        li:nth-child(2n+1) {
          padding-right: 1px;
        }
        li:nth-child(2n) {
          padding-left: 1px;
        }
      }
    }
  }
</style>
