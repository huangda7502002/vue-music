<template>
  <div id="indexPage">
    <div class="title">
      <div class="titleWrap ripple">
        <router-link tag="div" to="/index/music" class="titleItem">音乐</router-link>
      </div>
      <div class="titleWrap ripple">
        <router-link tag="div" to="/index/video" class="titleItem">视频</router-link>
      </div>
      <div class="titleWrap ripple">
        <router-link tag="div" to="/index/broadcast" class="titleItem">电台</router-link>
      </div>
    </div>
    <transition :name="transitionName">
      <keep-alive>
        <router-view class="pageContent"></router-view>
      </keep-alive>
    </transition>
  </div>
</template>

<script>

export default {
  name: 'index',
  data () {
    return {
      transitionName: ''
    }
  },
  computed: {
    transitionNameReverse () {
      if (this.transitionName === 'slide-right') {
        return 'slide-left'
      } else {
        return 'slide-right'
      }
    }
  },
  watch: {
    $route (to, from) {
      let fromIndex = from.meta.tab
      let toIndex = to.meta.tab
      let diff = parseInt(fromIndex) - parseInt(toIndex)
      this.transitionName = diff > 0 ? 'slide-right' : 'slide-left'
    }
  }
}
</script>

<style lang="scss" scoped>
 #indexPage {
   width: 100%;
   height: 100%;
   position: relative;
   background: #f2f4f5;
   $titleHeight:1.15rem;
   .title {
     position:absolute;
     width: 100%;
     top: 0;
     left: 0;
     height: $titleHeight;
     background:#fff;
     box-sizing: border-box;
     padding:0px 1.2rem;
     z-index: 1;
     display:flex;
     .router-link-active {
       color: #d33a31;
       border-bottom: .06rem solid #d33a31;
       box-sizing: border-box;
     }
     .titleWrap {
       width: 33.33%;
       height: 100%;
       .titleItem {
         width: 2rem;
         height: 100%;
         margin: 0 auto;
         line-height: 1.15rem;
         text-align:center;
       }
     }
   }
   .pageContent {
     position: absolute;
     left:0;
     top: 0;
     width: 100%;
     height: 100%;
   }

   /deep/ .scrollView {
     padding-top: $titleHeight;
   }

   .slide-left-enter {
     transform: translate(100%);
   }
   .slide-left-enter-active {
     transition: all .3s;
   }
   .slide-left-leave-active {
     transform: translate(-100%);
     transition: all  .3s;
   }

   .slide-right-enter {
     transform: translate(-100%);
   }
   .slide-right-enter-active {
     transition: all .3s;
   }
   .slide-right-leave-active {
     transform: translate(100%);
     transition: all  .3s;
   }

 }
</style>
