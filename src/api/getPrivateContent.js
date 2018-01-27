import axios from 'axios'

function getPrivateContent (callback) {
  let url = 'http://localhost:3000/personalized/privatecontent'
  axios.get(url).then((response) => {
    callback(response.data.result)
  }).catch((err) => {
    callback(err)
  })
}

export default getPrivateContent
