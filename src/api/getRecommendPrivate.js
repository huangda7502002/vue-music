import axios from 'axios'
import apiConfig from './apiConfig'

function getPrivateContent (callback) {
  let url = apiConfig.recommendPrivatePath
  axios.get(url).then((response) => {
    callback(response.data.result)
  }).catch((err) => {
    callback(err)
  })
}

export default getPrivateContent
