import axios from 'axios'
import apiConfig from './apiConfig.js'

function getBanner (callback) {
  let url = apiConfig.recommendBannerPath
  axios.get(url).then((response) => {
    callback(response.data.banners)
  }).catch((err) => {
    callback(err)
  })
}

export default getBanner
