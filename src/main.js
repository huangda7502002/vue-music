// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
// import '@/../static/MUI/css/mui.min.css'
import store from './store/index.js'
import '@/../static/swiper/swiper-4.1.0.min.css'
import '@/../static/css/normalize.css'
import '@/common/css/base.css'
import '@/../static/font-icon/style.css'
import IScroll from 'iscroll'
import IScrollView from 'vue-iscroll-view'
import init from '@/../static/js/init.js'
import FastClick from 'fastclick'

FastClick.attach(document.body)
init()

Vue.use(IScrollView, IScroll)
Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
})
