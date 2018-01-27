<template>
  <div id="recommendPrivate" v-if="privateList.length !== 0">
    <div class="title">
      {{titleName}}
    </div>
    <div class="content">
      <ul>
        <li>
          <img :src="privateList[1].picUrl" alt="">
          <p>{{privateList[1].name}}</p>
        </li>
        <li>
          <img :src="privateList[2].picUrl" alt="">
          <p>{{privateList[2].name}}</p>
        </li>
        <li>
          <img :src="privateList[0].picUrl" alt="">
          <p>{{privateList[0].name}}</p>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
export default {
  name: 'recommend-private',
  props: {
    titleName: {
      type: String,
      'default': ''
    },
    privateList: {
      type: Array,
      'default': []
    }
  }
}
</script>

<style lang="scss" scoped>
  #recommendPrivate {
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
          width:5.35rem;
          height:4.7rem;
          img {
            width: 5.35rem;
            height: 3.02rem;
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
        li:last-child {
          width: 100%;
          img {
            width: 100%;
            height: 4.2rem;
          }
        }
      }
    }
  }
</style>
