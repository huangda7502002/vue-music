import axios from 'axios'

function getBanner (callback) {
  let url = 'http://localhost:3000/banner'
  axios.get(url).then((response) => {
    callback(response.data.banners)
  }).catch((err) => {
    callback(err)
  })
}

export default getBanner
