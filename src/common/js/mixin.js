import {mapGetters} from 'vuex'
export const playListMixin = {
  computed: {
    ...mapGetters([
      'playerPlayList'
    ])
  },
  mounted () {
    this.handlePlayList(this.playerPlayList)
  },
  activated () {
    this.handlePlayList(this.playerPlayList)
  },
  watch: {
    playerPlayList (newVal) {
      this.handlePlayList(newVal)
    }
  },
  methods: {
    handlePlayList () {
      throw new Error('component must implement handlePlayerPlayList method')
    }
  }

}
