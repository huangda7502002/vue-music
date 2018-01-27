import Vue from 'vue'
import Router from 'vue-router'

import indexPage from '@/page/index'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/index',
      component: indexPage
    },
    {
      path: '*',
      redirect: '/index'
    }
  ]
})
