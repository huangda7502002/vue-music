import * as types from './mutation-types'
const mutations = {
  [types.SET_RECOMMEND_MUSICLIST] (state, data) {
    state.recommendMusicList = data
  },
  [types.SET_RECOMMEND_PRIVATE] (state, data) {
    state.recommendPrivate = data
  },
  [types.SET_RECOMMEND_BANNER] (state, data) {
    state.recommendBanner = data
  },
  [types.SET_RECOMMEND_MV] (state, data) {
    state.recommendMV = data
  },
  [types.SET_MUSICLISTDETAIL_SHOW] (state, data) {
    state.musicListDetail.show = data
  },
  [types.SET_MUSICLISTDETAIL_SHOWLIST] (state, data) {
    state.musicListDetail.showList = data
  },
  [types.SET_PLAYER_STATE] (state, data) {
    state.player.play = data
  },
  [types.SET_PLAYER_PLAYLIST] (state, data) {
    state.player.playList = data
  },
  [types.SET_PLAYER_FULLSCREEN] (state, data) {
    state.player.fullScreen = data
  },
  [types.SET_PLAYER_MODE] (state, data) {
    state.player.mode = data
  },
  [types.SET_PLAYER_CURRENTINDEX] (state, data) {
    state.player.currentIndex = data
  },
  [types.SET_PLAYER_SEQUENCELIST] (state, data) {
    state.player.sequenceList = data
  }
}
export default mutations
