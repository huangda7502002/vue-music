import axios from 'axios'
import apiConfig from './apiConfig'

function getMVDetail (id) {
  let url = apiConfig.MVDetail + `?mvid=${id}`
  return new Promise((resolve) => {
    axios.get(url).then((data) => {
      resolve(data.data)
    })
  })
}

export default getMVDetail
