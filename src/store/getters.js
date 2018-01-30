const getters = {
  recommendMusicList (state) {
    if (state.recommendMusicList.length > 6) {
      return state.recommendMusicList.slice(0, 6)
    } else {
      return state.recommendMusicList
    }
  },
  recommendPrivate (state) {
    return state.recommendPrivate
  },
  recommendMV (state) {
    return state.recommendMV
  },
  recommendBanner (state) {
    return state.recommendBanner
  },
  playerState (state) {
    return state.player.play
  },
  playerMode (state) {
    return state.player.Mode
  },
  playerPlayList (state) {
    return state.player.playList
  },
  playerCurrentIndex (state) {
    return state.player.currentIndex
  },
  playerFullScreen (state) {
    return state.player.FullScreen
  },
  playerSequenceList (state) {
    return state.player.SequenceList
  },
  musicListDetail (state) {
    return state.musicListDetail
  }
}
export default getters
