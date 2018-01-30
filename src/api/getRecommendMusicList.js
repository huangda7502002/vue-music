import axios from 'axios'
import apiConfig from './apiConfig'

function getMusic (callback) {
  let url = apiConfig.recommendMusicListPath
  axios.get(url).then((response) => {
    callback(response.data.result)
  }).catch((err) => {
    callback(err)
  })
}

export default getMusic
