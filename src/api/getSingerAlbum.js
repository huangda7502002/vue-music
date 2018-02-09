import axios from 'axios'
import apiConfig from './apiConfig'

function getSingerAlbum (id) {
  let url = apiConfig.singerAlbum + `?id=${id}`
  return new Promise((resolve) => {
    axios.get(url).then((data) => {
      resolve(data.data)
    })
  })
}

export default getSingerAlbum
