import getMusicList from '@/api/getMusicList'
import getPrivateContent from '@/api/getPrivateContent'

import * as types from './mutation-types'

const actions = {
  recommendMusicList ({commit, state}) {
    getMusicList((data) => {
      commit(types.SET_RECOMMEND_MUSICLIST, data)
    })
  },
  privateContent ({commit, state}) {
    getPrivateContent((data) => {
      commit(types.SET_RECOMMEND_PRIVATECONTENT, data)
    })
  }
}

export default actions
