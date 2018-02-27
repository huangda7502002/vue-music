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
import VueLazyLoad from 'vue-lazyload'
import logo from './logo.png'

FastClick.attach(document.body)
init()

Vue.use(VueLazyLoad, {
  loading: logo
})

Vue.use(IScrollView, IScroll)
Vue.config.productionTip = false

Vue.filter('time', function (value) {
  let dateNow = new Date()
  let second = Math.floor((dateNow.getTime() - value) / 1000)
  let minute = Math.floor(second / 60)
  let hour = Math.floor(second / 3600)
  if (second < 60) {
    return `${second}秒前`
  } else if (minute < 60) {
    return `${minute}分钟前`
  } else if (hour < 24) {
    return `${hour}小时前`
  } else {
    let subDate = new Date(value)
    let year = subDate.getFullYear()
    let month = subDate.getMonth() + 1
    let day = subDate.getDate()
    if (year === dateNow.getFullYear()) {
      return `${month}月${day}日`
    } else {
      return `${year}年${month}月${day}日`
    }
  }
})

Vue.filter('count', function (value) {
  if (value > 100000) {
    let num = Math.floor(value / 10000)
    return `${num}万`
  } else {
    return value
  }
})

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
})
