const state = {
  recommendMusicList: [],
  recommendPrivate: [],
  recommendBanner: [],
  recommendMV: [],
  topMV: [],
  musicListDetail: {
    showList: {},
    copywriter: '',
    show: false
  },
  albumDetail: {
    showList: {},
    show: false
  },
  MVDetail: {
    show: false,
    MVId: ''
  },
  player: {
    Play: false,
    FullScreen: false,
    PlayList: [],
    Mode: 'sequence',
    CurrentIndex: -1
  },
  searchShow: false,
  singer: {
    artist: {},
    list: [],
    show: false
  }
}
export default state
