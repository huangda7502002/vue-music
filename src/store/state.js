const state = {
  recommendMusicList: [],
  recommendPrivate: [],
  recommendBanner: [],
  recommendMV: [],
  topMV: [],
  musicListDetail: {
    showList: [],
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
  }
}
export default state
