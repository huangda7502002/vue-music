import getRecommendMusicList from '@/api/getRecommendMusicList'
import getRecommendPrivate from '@/api/getRecommendPrivate'
import getRecommendMV from '@/api/getRecommendMV'
import getTopMV from '@/api/getTopMV'
import getBanner from '@/api/getBanner'
import getMusicListDetail from '@/api/getMusicListDetail'
import getAlbumDetail from '@/api/getAlbum'

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
  showMusicListDetail ({commit, state}, obj) {
    commit(types.SET_MUSICLISTDETAIL_SHOW, true)
    commit(types.SET_MUSICLISTDETAIL_COPYWRITE, obj.copywriter)
    commit(types.SET_MUSICLISTDETAIL_SHOWLIST, [])
    getMusicListDetail(obj.id, (result) => {
      commit(types.SET_MUSICLISTDETAIL_SHOWLIST, result)
    })
  },
  showAlbumDetail ({commit, state}, obj) {
    commit(types.SET_ALBUMDETAIL_SHOW, true)
    commit(types.SET_ALBUMDETAIL_SHOWLIST, [])
    getAlbumDetail(obj.id, (result) => {
      if (result.code === 200) {
        for (let i = 0; i < result.songs.length; i++) {
          result.songs[i].duration = result.songs[i].dt
          result.songs[i].album = result.album
          result.songs[i].artists = result.songs[i].ar
          result.songs[i].alias = result.songs[i].alia
        }
        commit(types.SET_ALBUMDETAIL_SHOWLIST, result)
      }
    })
  },
  hideAlbumDetail ({commit}) {
    commit(types.SET_ALBUMDETAIL_SHOW, false)
  },
  hideMusicListDetail ({commit}) {
    commit(types.SET_MUSICLISTDETAIL_SHOW, false)
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
  },
  closeMVDetailPage ({commit}) {
    commit(types.SET_MVDETAIL_SHOW, false)
  },
  showSearchPage ({commit}) {
    commit(types.SET_SEARCH_SHOW, true)
  },
  hideSearchPage ({commit}) {
    commit(types.SET_SEARCH_SHOW, false)
  },
  showSingerPage ({commit}, artist) {
    commit(types.SET_SINGER_ARTIST, artist)
    commit(types.SET_SINGER_SHOW, true)
  },
  hideSingerPage ({commit}) {
    commit(types.SET_SINGER_SHOW, false)
  },
  deleteSong ({commit, state}, song) {
    let index = -1
    let playList = state.player.PlayList
    let currentIndex = state.player.CurrentIndex
    for (let i = 0; i < playList.length; i++) {
      if (song.id === playList[i].id) {
        index = i
        playList.splice(i, 1)
      }
    }
    if (index === -1) {
      return
    }
    if (currentIndex > index || currentIndex === playList.length) {
      currentIndex--
    }
    commit(types.SET_PLAYER_PLAYLIST, playList)
    commit(types.SET_PLAYER_CURRENTINDEX, currentIndex)
    if (!playList.length) {
      commit(types.SET_PLAYER_STATE, false)
    } else {
      commit(types.SET_PLAYER_STATE, true)
    }
  },
  addSong ({commit, state}, song) {
    let playList = state.player.PlayList
    getAlbumDetail(song.album.id, (result) => {
      song.album = result.album
      commit(types.SET_PLAYER_STATE, true)
      commit(types.SET_PLAYER_FULLSCREEN, true)
      for (let i = 0; i < playList.length; i++) {
        if (playList[i].id === song.id) {
          commit(types.SET_PLAYER_CURRENTINDEX, i)
          return
        }
      }
      playList.push(song)
      commit(types.SET_PLAYER_PLAYLIST, playList)
      commit(types.SET_PLAYER_CURRENTINDEX, playList.length - 1)
    })
  },
  deleteSongList ({commit}) {
    commit(types.SET_PLAYER_PLAYLIST, [])
    commit(types.SET_PLAYER_CURRENTINDEX, -1)
    commit(types.SET_PLAYER_STATE, false)
  }
}

export default actions
