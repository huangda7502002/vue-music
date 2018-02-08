const state = {
  recommendMusicList: [],
  recommendPrivate: [],
  recommendBanner: [],
  recommendMV: [],
  topMV: [],
  musicListDetail: {
    showList: [],
    copywriter: '',
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
  searchShow: false
}
export default state
