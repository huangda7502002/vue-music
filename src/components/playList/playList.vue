<template>
  <div class="playList">
    <ul v-if="playList.length > 0">
      <li @click="selectItem(item)"  :key="index" v-for="(item,index) in playList" class="listItem">
        <div class="left">
          <img v-lazy="item.coverImgUrl" alt="">
        </div>
        <div class="right">
          <p class="name">
            {{item.name}}
          </p>
          <p class="author">
            {{item.trackCount}}首&nbsp;by&nbsp;{{item.creator.nickname}},
            播放{{item.playCount | count}}次
          </p>
        </div>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  name: 'play-list',
  props: {
    playList: {
      type: Array,
      'default': []
    }
  },
  methods: {
    selectItem (item) {
      this.$emit('selectPlayListItem', item)
    }
  }
}
</script>

<style lang="scss" scoped>
  .playList {
    background-color: #f2f4f5;
  }
  .listItem{
    display:flex;
    height: 1.8rem;
    .left {
      width: 2.1rem;
      position: relative;
      img {
        width: 1.62rem;
        height: 1.62rem;
        display:block;
        position: absolute;
        left: .18rem;
        top: .08rem;
      }
    }
    .right {
      flex: 1;
      border-bottom: 1px solid #dadcdd;
      .name {
        width: 100%;
        overflow:hidden;
        font-size: .42rem;
        color: #303131;
        margin-top:.39rem;
      }
      .author {
        width: 100%;
        overflow:hidden;
        font-size: .3rem;
        color: #797a7b;
        margin-top: .27rem;
      }
    }
  }
</style>
