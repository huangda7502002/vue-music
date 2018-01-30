<template>
  <div class="BScroll" ref="BScroll">
    <slot></slot>
  </div>
</template>

<script>
import BScroll from 'better-scroll'
export default {
  name: 'scroll',
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
    }
  },
  data () {
    return {
      scroll: null
    }
  },
  methods: {
    init () {
      this.scroll = new BScroll(this.$refs.BScroll, {
        scrollbar: this.scrollbar,
        mouseWheel: this.mouseWheel,
        bounce: this.bounce,
        click: this.click
      })
    },
    refresh () {
      setTimeout(() => {
        this.scroll.refresh()
      }, 20)
    }
  },
  mounted () {
    this.init()
  }
}
</script>

<style scoped>
  .BScroll {
    width: 100%;
    height: 100%;
    position:relative;
    overflow:hidden;
  }
</style>
