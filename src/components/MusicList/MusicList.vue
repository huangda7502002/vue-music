<template>
  <div class="musicList">
    <ul>
      <li v-for="(item,index) in tracks" :key="index" class="listItem" @click="selectItem(item, index)">
        <span class="rank">{{index + 1}}</span>
        <div class="music">
          <p>
            {{getName(item)}}
            <span v-if="item.alias.length != 0">{{item.alias[0]}}</span>
          </p>
          <p class="artists">
            <span v-for="(artist,idx) in item.artists" :key="idx">
              {{artist.name}}
              <span v-if="idx < item.artists.length - 1">/</span>
            </span>
            <span>-{{item.album.name}}</span>
          </p>
        </div>
        <div class="more">
          <i class="icon-list-circle"></i>
        </div>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  name: 'music-list',
  props: {
    rank: {
      type: Boolean,
      'default': true
    },
    tracks: {
      type: Array,
      'default': []
    }
  },
  methods: {
    getName (trackItem) {
      return trackItem.name
    },
    selectItem (item, index) {
      this.$emit('selected', item, index)
    }
  }
}
</script>

<style lang="scss" scoped>
  .musicList {
    background-color: #f2f4f5;
  }
  .listItem{
    width: 100%;
    height: 1.65rem;
    display:flex;
    text-align:center;
    line-height: 1.65rem;
    background-color: #f2f4f5;
    color: #919293;
    border:none;
    .rank{
      flex: 1;
    }
    .music {
      flex: 5.2;
      text-align:left;
      line-height: .54rem;
      padding: .3rem 0;
      font-size: .43rem;
      color:#303131;
      border-bottom: 1px solid #e7e9e9;
      .artists {
        margin-top: .08rem;
        color:#797a7b;
        font-size:.3rem;
      }
      overflow: hidden;
      white-space: nowrap;
      text-overflow: ellipsis;
    }
    .more {
      flex: 1;
      border-bottom: 1px solid #e7e9e9;
    }
  }
</style>
