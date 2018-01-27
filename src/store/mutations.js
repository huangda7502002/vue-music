import * as types from './mutation-types'
const mutations = {
  [types.SET_RECOMMEND_MUSICLIST] (state, data) {
    state.recommendMusicList = data
  },
  [types.SET_RECOMMEND_PRIVATECONTENT] (state, data) {
    state.recommendPrivate = data
  }
}
export default mutations
