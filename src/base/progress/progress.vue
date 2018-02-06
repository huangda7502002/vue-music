<template>
  <div class="grogress-bar" @click="progressClick">
    <div class="bar-inner" ref="barInner">
      <div class="buffer-inner" ref="bufferProgress"></div>
      <div class="grogress-inner" ref="progress"></div>
      <div v-show="showBtn" class="grogress-btn-wrapper" @touchend.prevent="progressTouchEnd" @touchmove.prevent="progressTouchMove" @touchstart.prevent="progressTouchStart" ref="btn">
        <div class="progress-btn"></div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'my-progress',
  props: {
    percent: {
      type: Number,
      'default': 0
    },
    showBtn: {
      type: Boolean,
      'default': true
    },
    bufferPercent: {
      type: Number,
      'default': 0
    }
  },
  created () {
    this.touch = {
      initiated: false,
      startX: 0,
      left: 0
    }
  },
  methods: {
    progressTouchStart (e) {
      this.touch.initiated = true
      this.touch.startX = e.touches[0].pageX
      this.touch.left = this.$refs.progress.clientWidth
    },
    offset (offsetWidth) {
      this.$refs.progress.style.width = offsetWidth + 'px'
      this.$refs.btn.style.transform = `translateX(${offsetWidth}px)`
    },
    progressTouchMove (e) {
      if (!this.touch.initiated) {
        return
      }
      const deltaX = e.touches[0].pageX - this.touch.startX
      let offsetWidth = deltaX + this.touch.left
      if (offsetWidth <= 0) {
        offsetWidth = 0
      }
      if (offsetWidth >= this.$refs.barInner.offsetWidth) {
        offsetWidth = this.$refs.barInner.offsetWidth
      }
      this.offset(offsetWidth)
      const barWidth = this.$refs.progress.clientWidth
      const percent = barWidth / this.$refs.barInner.clientWidth
      this.$emit('progressMove', percent)
    },
    triggerPercent () {
      const barWidth = this.$refs.progress.clientWidth
      const percent = barWidth / this.$refs.barInner.clientWidth
      this.$emit('percentChange', percent)
    },
    progressTouchEnd () {
      this.triggerPercent()
      this.touch.initiated = false
    },
    progressClick (e) {
      const rect = this.$refs.barInner.getBoundingClientRect()
      const offsetWidith = e.pageX - rect.left
      this.offset(offsetWidith)
      this.triggerPercent()
    }
  },
  watch: {
    percent (newPercent) {
      if (newPercent >= 0 && newPercent <= 1 && !this.touch.initiated) {
        let barwidth = this.$refs.barInner.offsetWidth
        let offsetWidth = newPercent * barwidth
        this.offset(offsetWidth)
      }
    },
    bufferPercent (newPercent) {
      if (newPercent >= 0 && newPercent <= 1 && !this.touch.initiated) {
        let barwidth = this.$refs.barInner.offsetWidth
        let offsetWidth = newPercent * barwidth
        this.$refs.bufferProgress.style.width = offsetWidth + 'px'
      }
    }
  }
}
</script>

<style lang="scss" scoped>
  .grogress-bar {
    padding: 0 .10rem;
    height: .5rem;
    .bar-inner {
      position: relative;
      top: .12rem;
      height: .06rem;
      background-color: #191919;
      border-radius: .03rem;
      .buffer-inner {
        position: absolute;
        height: 100%;
        left: 0;
        top: 0;
        background: #8c8c8c;
      }
      .grogress-inner {
        position: absolute;
        height: 100%;
        left: 0;
        top: 0;
        background: #d33a31;
      }
      .grogress-btn-wrapper {
        position: absolute;
        width: .42rem;
        height: .42rem;
        top: -.18rem;
        left: -.21rem;
        background: #fff;
        border-radius: 50%;
        .progress-btn {
          width: .1rem;
          height: .1rem;
          position: absolute;
          top: .16rem;
          left: .16rem;
          border-radius: 50%;
          background:#d33a31;
        }
      }

    }

  }
</style>
