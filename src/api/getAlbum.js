import axios from 'axios'
import apiConfig from './apiConfig'

function getAlbumDetail (id, callback) {
  let url = apiConfig.AlbumDetailPath + '?id=' + id
  axios.get(url).then((response) => {
    callback(response.data)
  }).catch((err) => {
    callback(err)
  })
}

export default getAlbumDetail
