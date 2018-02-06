<template>
  <div class="BScroll" ref="BScroll">
    <div class="content">
      <div ref="pulldown" class="pulldown-wrapper" :style="pullDownStyle" v-if="pullDownRefresh">
        <div class="before-trigger" v-if="beforePullDown">
          <bubble :pullDownTop="pullDownTop"></bubble>
        </div>
        <div class="after-trigger" v-else>
          <div v-if="isPullingDown" class="loading">
            <loading></loading>
          </div>
        </div>
      </div>
      <slot></slot>
      <div class="pullup-wrapper" v-if="pullUpLoad">
        <div class="after-trigger" v-if="isPullUpLoad">
          <loading></loading>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import BScroll from 'better-scroll'
import Bubble from '@/base/Bubble/Bubble'
import Loading from '@/base/loading/loading'
export default {
  name: 'scroll',
  components: {
    Bubble, Loading
  },
  props: {
    scrollbar: {
      type: Boolean,
      'default': false
    },
    mouseWheel: {
      type: Boolean,
      'default': false
    },
    bounce: {
      type: Boolean,
      'default': true
    },
    click: {
      type: Boolean,
      'default': true
    },
    data: {
      'default': null
    },
    pullDownRefresh: {
      'default': false
    },
    pullUpLoad: {
      type: null,
      default: false
    }
  },
  data () {
    return {
      scroll: null,
      isPullingDown: false,
      beforePullDown: true,
      pullDownInitTop: -50,
      pullDownStyle: '',
      pullDownTop: -50,
      isPullUpLoad: false
    }
  },
  methods: {
    init () {
      this.scroll = new BScroll(this.$refs.BScroll, {
        scrollbar: this.scrollbar,
        mouseWheel: this.mouseWheel,
        bounce: this.bounce,
        click: this.click,
        pullDownRefresh: this.pullDownRefresh,
        pullUpLoad: this.pullUpLoad
      })
      if (this.pullDownRefresh) {
        this.initPullDownRefresh()
      }
      if (this.pullUpLoad) {
        this.initPullUpLoad()
      }
    },
    refresh () {
      setTimeout(() => {
        this.scroll.refresh()
      }, 20)
    },
    scrollToElement () {
      this.scroll.scrollToElement.apply(this.scroll, arguments)
    },
    scrollTo () {
      this.scroll.scrollTo.apply(this.scroll, arguments)
    },
    initPullDownRefresh () {
      this.scroll.on('pullingDown', () => {
        this.beforePullDown = false
        this.isPullingDown = true
        this.$emit('pullingDown')
      })
      this.scroll.on('scroll', (pos) => {
        if (this.beforePullDown) {
          this.pullDownStyle = `top:${Math.min(pos.y + this.pullDownInitTop, 10)}px`
          this.pullDownTop = Math.min(pos.y + this.pullDownInitTop, 10)
        }
        if (this.isRebounding) {
          this.pullDownStyle = `top:${10 - (this.pullDownRefresh.stop - pos.y)}px`
          this.pullDownTop = 10 - (this.pullDownRefresh.stop - pos.y)
        }
      })
    },
    reboundPullDown () {
      const {stopTime = 600} = this.pullDownRefresh
      return new Promise((resolve) => {
        setTimeout(() => {
          this.isRebounding = true
          this.scroll.finishPullDown()
          resolve()
        }, stopTime)
      })
    },
    afterPullDown () {
      setTimeout(() => {
        this.beforePullDown = true
        this.pullDownStyle = `top:${this.pullDownInitTop}px`
        this.isRebounding = false
        this.refresh()
      }, this.scroll.options.bounceTime)
    },
    forceUpdate () {
      if (this.pullDownRefresh && this.isPullingDown) {
        this.isPullingDown = false
        this.reboundPullDown().then(() => {
          this.afterPullDown()
        })
      } else if (this.pullUpLoad && this.isPullUpLoad) {
        this.isPullUpLoad = false
        this.scroll.finishPullUp()
        this.refresh()
      } else {
        this.refresh()
      }
    },
    initPullUpLoad () {
      this.scroll.on('pullingUp', () => {
        this.isPullUpLoad = true
        this.$emit('pullingUp')
      })
    }
  },
  watch: {
    data () {
      this.refresh()
    }
  },
  mounted () {
    this.init()
  }
}
</script>

<style lang="scss" scoped>
  .BScroll {
    width: 100%;
    height: 100%;
    position:relative;
    overflow:hidden;
    .content {
      position: static;
    }
    .pulldown-wrapper {
      position: absolute;
      width: 100%;
      left: 0;
      z-index: 1;
      top: -50px;
      display:flex;
      justify-content: center;
      align-items:center;
      transition: all;
      .after-trigger {
        margin-top: 10px;
      }
    }
    .pullup-wrapper {
      width: 100%;
      display: flex;
      justify-content: center;
      align-items: center;
      padding: 16px 0;
    }
  }
</style>
