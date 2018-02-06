import axios from 'axios'
import apiConfig from './apiConfig'

function getMVSimi (id) {
  let url = apiConfig.MVSimi + `?mvid=${id}`
  return new Promise((resolve) => {
    axios.get(url).then((data) => {
      resolve(data.data.mvs)
    })
  })
}

export default getMVSimi
