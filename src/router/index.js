import Vue from 'vue'
import Router from 'vue-router'

import indexPage from '@/page/index/index'
import topicPage from '@/page/topicPage/topicPage'
import myMusic from '@/page/myMusic/myMusic'
import musicPage from '@/page/musicPage/musicPage'
import videoPage from '@/page/videoPage/videoPage'
import broadcast from '@/page/broadcastPage/broadcastPage'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/index',
      component: indexPage,
      redirect: '/index/music',
      children: [
        {
          path: 'music',
          component: musicPage,
          meta: {
            tab: 1
          }
        },
        {
          path: 'video',
          component: videoPage,
          meta: {
            tab: 2
          }
        },
        {
          path: 'broadcast',
          component: broadcast,
          meta: {
            tab: 3
          }
        }
      ]
    },
    {
      path: '/myMusic',
      component: myMusic
    },
    {
      path: '/topic',
      component: topicPage
    },
    {
      path: '*',
      redirect: '/index/music'
    }
  ]
})
