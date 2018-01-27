<template>
  <div id="recommendMusic" v-if="musicList.length !== 0">
    <div class="title">
      {{titleName}}
    </div>
    <div class="content">
      <ul>
        <li v-for="(item,index) in musicList" :key="index">
          <img :src="item.picUrl" alt="">
          <p>{{item.name}}</p>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
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
  }
}
</script>

<style lang="scss" scoped>
  #recommendMusic {
    margin-bottom: .45rem;
    .title {
      height: .45rem;
      line-height: .45rem;
      font-size: .35rem;
      border-left: .06rem solid #d33a31;
      text-indent: .2rem;
      margin-bottom: .45rem;
    }
    .content {
      height: 10.5rem;
      width: 100%;
      overflow:hidden;
      ul {
        display:flex;
        justify-content:space-between;
        flex-wrap: wrap;
        li {
          width:3.5rem;
          height:5.25rem;
          img {
            width: 3.5rem;
            height: 3.5rem;
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
      }
    }
  }
</style>
