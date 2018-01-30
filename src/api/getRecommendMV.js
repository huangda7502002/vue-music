import axios from 'axios'
import apiConfig from './apiConfig'

function getMV (callback) {
  let url = apiConfig.recommendMVPath
  axios.get(url).then((response) => {
    callback(response.data.result)
  }).catch((err) => {
    callback(err)
  })
}

export default getMV
