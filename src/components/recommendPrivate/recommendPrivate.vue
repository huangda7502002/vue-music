<template>
  <div id="recommendPrivate" v-if="privateList.length !== 0">
    <div class="title">
      {{titleName}}
      <i class="icon icon-right"></i>
    </div>
    <div class="content">
      <ul>
        <li>
          <img :src="privateList[1].sPicUrl" alt="">
          <p>{{privateList[1].name}}</p>
        </li>
        <li>
          <img :src="privateList[2].sPicUrl" alt="">
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
        display:flex;
        justify-content:space-between;
        flex-wrap: wrap;
        li {
          width: 50%;
          height:4.7rem;
          box-sizing:border-box;
          img {
            width: 100%;
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
        li:first-child {
          padding-right:1px;
        }
        li:nth-child(2) {
          padding-left:1px;
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
