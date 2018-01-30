import axios from 'axios'
import apiConfig from './apiConfig'

function getMusicListDetail (id, callback) {
  let url = apiConfig.musicListDetailPath + '?id=' + id
  axios.get(url).then((response) => {
    callback(response.data.result)
  }).catch((err) => {
    callback(err)
  })
}

export default getMusicListDetail
