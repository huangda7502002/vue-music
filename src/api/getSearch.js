import axios from 'axios'
import apiConfig from './apiConfig'

function getSearch (keywords, type, limit, offset, callback) {
  let url = apiConfig.search + `?keywords=${keywords}&type=${type}&limit=${limit}&offset=${offset}`
  axios.get(url).then((data) => {
    callback(data.data)
  }).catch((err) => {
    callback(err)
  })
}

export default getSearch
