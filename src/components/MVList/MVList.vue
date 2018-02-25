<template>
  <div class="MVList">
    <div class="listWrap">
      <div class="listItem" @click="selectItem(item.id)" :key="index" v-for="(item,index) in MVList">
        <div class="left">
          <img v-if="item.cover" v-lazy="item.cover" alt="">
          <img v-else v-lazy="item.imgurl"  alt="">
        </div>
        <div class="right">
          <p class="name">{{item.name}}</p>
          <p class="time">
            {{format(item.duration / 1000)}}&nbsp;{{item.artistName}}
          </p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'm-v-list',
  props: {
    MVList: {
      type: Array,
      'default': []
    }
  },
  methods: {
    format (interval) {
      let minute = Math.floor(interval / 60) | 0
      let second = Math.floor(interval % 60) | 0
      minute = minute < 10 ? '0' + minute : minute
      second = second < 10 ? '0' + second : second
      return `${minute}:${second}`
    },
    selectItem (id) {
      this.$emit('selectItem', id)
    }
  }
}
</script>

<style lang="scss" scoped>
  .listWrap {
    width: 100%;
    .listItem {
      height: 2.22rem;
      display:flex;
      .left {
        padding: .24rem .26rem .19rem .18rem;
        width: 2.67rem;
        img {
          width: 100%;
          height: 100%;
        }
      }
      .right {
        flex: 1;
        overflow:hidden;
        font-size: .44rem;
        padding-top: .37rem;
        border-bottom: 1px solid #dadcdd;
        .name {
          height: .95rem;
          overflow:hidden;
        }
        .time {
          line-height: .38rem;
          color: #797a7b;
          font-size: .36rem;
          margin-top: .2rem;
        }
      }
    }
  }
</style>
