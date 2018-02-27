<template>
  <div class="albumList">
    <ul v-if="albumList.length > 0">
      <li :key="index" v-for="(item,index) in albumList" class="listItem" @click="selectAlbum(item)">
        <div class="left">
          <img v-lazy="item.picUrl" alt="">
        </div>
        <div class="right">
          <p class="name">
            {{item.name}}
          </p>
          <p class="author">
            {{item.artist.name}}&nbsp;{{item.publishTime | time}}
          </p>
        </div>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  name: 'album-list',
  props: {
    albumList: {
      type: Array,
      'default': []
    }
  },
  methods: {
    selectAlbum (item) {
      this.$emit('selectAlbumItem', item)
    }
  }
}
</script>

<style lang="scss" scoped>
  .albumList {
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
      overflow:hidden;
      .name {
        width: 100%;
        overflow:hidden;
        font-size: .42rem;
        height: .5rem;
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
