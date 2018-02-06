import axios from 'axios'
import apiConfig from './apiConfig'

function login (callback) {
  let url = apiConfig.login
  axios.get(url).then(() => {
    callback()
  }).catch((err) => {
    callback(err)
  })
}

export default login
