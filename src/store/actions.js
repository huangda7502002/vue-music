import getRecommendMusicList from '@/api/getRecommendMusicList'
import getRecommendPrivate from '@/api/getRecommendPrivate'
import getRecommendMV from '@/api/getRecommendMV'
import getTopMV from '@/api/getTopMV'
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
  getTopMV ({commit, state}, {limit, offset}) {
    getTopMV(limit, offset, (data) => {
      commit(types.SET_TOP_MV, data)
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
    commit(types.SET_PLAYER_PLAYLIST, list)
    commit(types.SET_PLAYER_CURRENTINDEX, index)
    commit(types.SET_PLAYER_STATE, true)
    commit(types.SET_PLAYER_FULLSCREEN, true)
  },
  randomPlay ({commit, state}, list) {
    let index = Math.floor(Math.random() * list.length)
    commit(types.SET_PLAYER_PLAYLIST, list)
    commit(types.SET_PLAYER_CURRENTINDEX, index)
    commit(types.SET_PLAYER_STATE, true)
    commit(types.SET_PLAYER_FULLSCREEN, true)
    commit(types.SET_PLAYER_MODE, 'random')
  },
  showMVDetailPage ({commit, state}, id) {
    commit(types.SET_MVDETAIL_SHOW, true)
    commit(types.SET_MVDETAIL_MVID, id)
  }
}

export default actions
