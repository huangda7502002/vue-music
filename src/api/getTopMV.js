import axios from 'axios'
import apiConfig from './apiConfig'

function getTopMV (limit, offset, callback) {
  let url = apiConfig.topMV + `?limit=${limit}&offset=${offset}`
  axios.get(url).then((data) => {
    callback(data.data)
  }).catch((err) => {
    callback(err)
  })
}

export default getTopMV
