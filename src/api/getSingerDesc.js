import axios from 'axios'
import apiConfig from './apiConfig'

function getSingerDesc (id) {
  let url = apiConfig.singerDesc + `?id=${id}`
  return new Promise((resolve) => {
    axios.get(url).then((data) => {
      resolve(data.data)
    })
  })
}

export default getSingerDesc
