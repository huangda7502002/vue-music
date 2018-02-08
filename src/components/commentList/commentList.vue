<template>
  <div class="commentList" v-if="comment && comment.length > 0">
    <ul class="hotComments" v-if="comment[0].hotComments">
      <div class="title" v-if="comment[0].hotComments.length > 0">精彩评论({{comment[0].hotComments.length}})</div>
      <li class="listItem" :key="index" v-for="(item,index) in comment[0].hotComments">
        <div class="left">
          <img :src="item.user.avatarUrl" alt="">
        </div>
        <div class="right">
          <p class="name">{{item.user.nickname}}</p>
          <p class="time">{{item.time | time}}</p>
          <p class="content">{{item.content}}</p>
        </div>
      </li>
    </ul>
    <ul class="comments">
      <div class="title" v-if="comment[0].comments.length > 0">最新评论({{comment[0].total}})</div>
      <div v-for="(obj,index) in comment" :key="index">
        <li class="listItem" :key="index" v-for="(item,index) in obj.comments">
          <div class="left">
            <img :src="item.user.avatarUrl" alt="">
          </div>
          <div class="right">
            <p class="name">{{item.user.nickname}}</p>
            <p class="time">{{item.time | time}}</p>
            <p class="content">{{item.content}}</p>
          </div>
        </li>
      </div>
    </ul>
  </div>
</template>

<script>
export default {
  name: 'comment-list',
  props: {
    comment: {
      type: Array,
      'default': []
    }
  }
}
</script>

<style lang="scss" scoped>
.commentList {
  width: 100%;
  .title {
    height: .76rem;
    line-height: .76rem;
    background: #e7e9e9;
    color: #5c5d5d;
    font-size: .34rem;
    text-indent: .32rem;
    width: 100%;
  }

  .listItem {
    display:flex;
  }
  .left {
    width: 1.51rem;
    height: 100%;
    position:relative;
    img {
      position: absolute;
      left: .32rem;
      top: .32rem;
      width: .92rem;
      height: .92rem;
      border-radius: 50%;
    }
  }
  .right {
    flex: 1;
    border-bottom: 1px solid #dadcdd;
    padding-top: .4rem;
    padding-right: .32rem;
    padding-bottom: .3rem;
    .name {
      line-height: .45rem;
      color: #616262;
      font-size: .37rem;
      margin-bottom: .1rem;
    }
    .time {
      font-size: .26rem;
      color: #919293;
      margin-bottom: .39rem;
    }
    .content {
      font-size: .39rem;
      color: #343535;
    }

  }
}
</style>
