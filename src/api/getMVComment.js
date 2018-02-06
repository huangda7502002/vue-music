import axios from 'axios'
import apiConfig from './apiConfig'

function getMVComment (id) {
  let url = apiConfig.MVComment + `?id=${id}`
  return new Promise((resolve) => {
    axios.get(url).then((data) => {
      resolve(data.data)
    })
  })
}

export default getMVComment
