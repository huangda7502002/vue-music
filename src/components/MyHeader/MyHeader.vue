<template>
  <div id="header">
    <i class="menu icon-menu ripple"></i>
    <div class="option">
      <router-link tag="div" to="/myMusic" class="optionItem ripple">
        <i class="icon-music"></i>
      </router-link>
      <router-link tag="div" to="/index" class="optionItem ripple">
        <i class="icon-wangyi"></i>
      </router-link>
      <router-link tag="div" to="/topic" class="optionItem ripple">
        <i class="icon-community"></i>
      </router-link>
    </div>
    <i class="search icon-search ripple"></i>
  </div>
</template>

<script>
import '@/common/css/index.css'

export default {
  name: 'my-header',
  methods: {
    init () {
    },
    mounted () {
      this.init()
    }
  }
}
</script>

<style lang="scss" scoped>
  #header {
    $headerHeight: 1.57rem;
    height: $headerHeight;
    background-color:#d33a31;
    position:absolute;
    top:0;
    left: 0;
    width: 100%;
    .menu,.search {
      position:absolute;
      top: 50%;
      color: white;
      font-size: .7rem;
      margin-top: -.35rem;
    }
    .menu {
      left: .45rem;
    }
    .option {
      $optionItemWidth: 1.65rem;
      width: $optionItemWidth * 3;
      height: $headerHeight;
      margin: 0 auto;
      color: #e58983;
      .router-link-active {
        color: #fff;
      }
      .optionItem {
        width: 33.33%;
        height: 100%;
        float: left;
        text-align:center;
        padding-top: .08rem;
        line-height: $headerHeight;
        font-size: .7rem;
        box-sizing: border-box;
      }
      .optionItem:nth-child(2) {
        font-size: .8rem;
      }
    }
    .search {
      right: .45rem;
    }
  }
</style>
