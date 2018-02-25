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
  [types.SET_TOP_MV] (state, data) {
    state.topMV = data
  },
  [types.SET_MUSICLISTDETAIL_SHOW] (state, data) {
    state.musicListDetail.show = data
  },
  [types.SET_MUSICLISTDETAIL_SHOWLIST] (state, data) {
    state.musicListDetail.showList = Object.assign({}, data)
  },
  [types.SET_MUSICLISTDETAIL_COPYWRITE] (state, data) {
    state.musicListDetail.copywriter = data
  },
  [types.SET_PLAYER_STATE] (state, data) {
    state.player.Play = data
  },
  [types.SET_PLAYER_PLAYLIST] (state, data) {
    state.player.PlayList = Object.assign([], data)
  },
  [types.SET_PLAYER_FULLSCREEN] (state, data) {
    state.player.FullScreen = data
  },
  [types.SET_PLAYER_MODE] (state, data) {
    state.player.Mode = data
  },
  [types.SET_PLAYER_CURRENTINDEX] (state, data) {
    state.player.CurrentIndex = data
  },
  [types.SET_MVDETAIL_MVID] (state, data) {
    state.MVDetail.MVId = data
  },
  [types.SET_MVDETAIL_SHOW] (state, data) {
    state.MVDetail.show = data
  },
  [types.SET_SEARCH_SHOW] (state, data) {
    state.searchShow = data
  },
  [types.SET_SINGER_ARTIST] (state, data) {
    state.singer.artist = data
  },
  [types.SET_SINGER_SHOW] (state, data) {
    state.singer.show = data
  },
  [types.SET_SINGER_LIST] (state, data) {
    state.singer.list = data
  }
}
export default mutations
