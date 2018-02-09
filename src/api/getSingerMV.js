mport axios from 'axios'
import apiConfig from './apiConfig'

function getSingerMV (id) {
  let url = apiConfig.singerMV + `?id=${id}`
  return new Promise((resolve) => {
    axios.get(url).then((data) => {
      resolve(data.data)
    })
  })
}

export default getSingerMV
