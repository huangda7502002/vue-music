<template>
  <div class="player">
    <div class="normal-player" v-show="playerFullScreen">
      播放器
    </div>
    <div class="mini-player" v-show="!playerFullScreen">

    </div>
  </div>
</template>

<script>
import {mapGetters} from 'vuex'
export default {
  name: 'player',
  data () {
    return {

    }
  },
  computed: {
    ...mapGetters([
      'playerFullScreen',
      'playerPlayList'
    ])
  }
}
</script>

<style lang="scss" scoped>
  .player {
    .normal-player {
      position: fixed;
      left: 0;
      right: 0;
      bottom:  0;
      top: 0;
    }
  }
</style>
