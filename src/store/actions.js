import getRecommendMusicList from '@/api/getRecommendMusicList'
import getRecommendPrivate from '@/api/getRecommendPrivate'
import getRecommendMV from '@/api/getRecommendMV'
import getBanner from '@/api/getBanner'
import getMusicListDetail from '@/api/getMusicListDetail'

import * as types from './mutation-types'

const actions = {
  getRecommendMusicList ({commit, state}) {
    getRecommendMusicList((data) => {
      commit(types.SET_RECOMMEND_MUSICLIST, data)
    })
  },
  getRecommendBanner ({commit, state}) {
    getBanner((data) => {
      commit(types.SET_RECOMMEND_BANNER, data)
    })
  },
  getRecommendPrivate ({commit, state}) {
    getRecommendPrivate((data) => {
      commit(types.SET_RECOMMEND_PRIVATE, data)
    })
  },
  getRecommendMV ({commit, state}) {
    getRecommendMV((data) => {
      commit(types.SET_RECOMMEND_MV, data)
    })
  },
  showMusicListDetail ({commit, state}, data) {
    getMusicListDetail(data, (result) => {
      commit(types.SET_MUSICLISTDETAIL_SHOWLIST, result)
      commit(types.SET_MUSICLISTDETAIL_SHOW, true)
    })
  },
  hideMusicListDetail () {

  },
  selectPlay ({commit, state}, {list, index}) {
    commit(types.SET_PLAYER_SEQUENCELIST, list)
    commit(types.SET_PLAYER_PLAYLIST, list)
    commit(types.SET_PLAYER_CURRENTINDEX, index)
    commit(types.SET_PLAYER_FULLSCREEN, true)
    commit(types.SET_PLAYER_STATE, true)
  }
}

export default actions
