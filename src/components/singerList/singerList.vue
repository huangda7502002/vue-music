<template>
  <div class="singerList">
    <ul v-if="singerList.length > 0">
      <li :key="index" v-for="(item,index) in singerList" class="listItem">
        <div class="left">
          <img v-lazy="item.img1v1Url" alt="">
        </div>
        <div class="right">
          <p class="name">
            {{item.name}}
            <span class="alias" v-if="item.alias.length > 0">
              ({{item.alias[0]}})
            </span>
          </p>
        </div>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  name: 'singer-list',
  props: {
    singerList: {
      type: Array,
      'default': []
    }
  }
}
</script>

<style lang="scss" scoped>
  .singerList {
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
        line-height: 1.8rem;
        .alias {
          color:#999;
        }
      }
    }
  }
</style>
