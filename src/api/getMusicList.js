import axios from 'axios'

function getMusic (callback) {
  let url = 'http://localhost:3000/personalized'
  axios.get(url).then((response) => {
    callback(response.data.result)
  }).catch((err) => {
    callback(err)
  })
}

export default getMusic
