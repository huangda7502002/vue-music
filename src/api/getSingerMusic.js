import axios from 'axios'
import apiConfig from './apiConfig'

function getSingerMusic (id) {
  let url = apiConfig.singerMusic + `?id=${id}`
  return new Promise((resolve) => {
    axios.get(url).then((data) => {
      resolve(data.data)
    })
  })
}

export default getSingerMusic
