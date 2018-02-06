import axios from 'axios'
import apiConfig from './apiConfig.js'

function getLyric (id, callback) {
  let url = apiConfig.lyricPath + '?id=' + id
  axios.get(url).then((response) => {
    callback(response.data)
  }).catch((err) => {
    callback(err)
  })
}

export default getLyric
