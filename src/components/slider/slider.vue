<template>
  <div id="silder">
    <div class="swiper-container">
      <div class="swiper-wrapper">
        <div v-for="(item,index) in sliderList" :key="index" class="swiper-slide"><img :src="item.pic" alt=""></div>
      </div>
      <div class="swiper-pagination"></div>
    </div>
  </div>
</template>

<script>
import Swiper from '@/../static/swiper/swiper-4.1.0.min.js'
export default {
  name: 'slider',
  props: {
    sliderList: {
      type: Array,
      'default': []
    }
  },
  data () {
    return {
      swiper: null
    }
  },
  methods: {
    init () {
      this.swiper = new Swiper('.swiper-container', {
        loop: true,
        pagination: {
          el: '.swiper-pagination'
        },
        autoplay: true,
        observer: true,
        observeParents: true
      })
    }
  },
  updated () {
    this.init()
  }
}
</script>

<style lang="scss" scoped>
  #silder {
    height: 4.2rem;
    overflow:hidden;
    .swiper-container {
      height: 100%;
    }
    /deep/ .swiper-pagination {
      .swiper-pagination-bullet-active {
        background: #d33a31;
      }
    }
    .swiper-slide img {
      width: 100%;
      height: 100%;
    }
  }
</style>
