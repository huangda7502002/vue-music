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
  topMV (state) {
    return state.topMV.data
  },
  playerState (state) {
    return state.player.Play
  },
  playerMode (state) {
    return state.player.Mode
  },
  playerPlayList (state) {
    return state.player.PlayList
  },
  playerCurrentIndex (state) {
    return state.player.CurrentIndex
  },
  playerFullScreen (state) {
    return state.player.FullScreen
  },
  playerCurrentSong (state) {
    return state.player.PlayList[state.player.CurrentIndex]
  },
  musicListDetail (state) {
    return state.musicListDetail
  },
  MVDetailShow (state) {
    return state.MVDetail.show
  },
  MVDetailId (state) {
    return state.MVDetail.MVId
  },
  searchShow (state) {
    return state.searchShow
  },
  singerArtist (state) {
    return state.singer.artist
  },
  singerShow (state) {
    return state.singer.show
  },
  singerList (state) {
    return state.singer.list
  }
}
export default getters
