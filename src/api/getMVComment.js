import axios from 'axios'
import apiConfig from './apiConfig'

function getMVComment (id, limit, offset) {
  let url = apiConfig.MVComment + `?id=${id}&limit=${limit}&offset=${offset}`
  return new Promise((resolve) => {
    axios.get(url).then((data) => {
      resolve(data.data)
    })
  })
}

export default getMVComment
