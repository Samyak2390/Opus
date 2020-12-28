import axios from 'axios'
const devEnv = 'http://localhost:80/WAT/wat2019/api-opus/api/'
export default {
  addToFav(payload) {
    return axios({
      method: 'post',
      url: devEnv + 'users/addfavourite.php',
      data: payload,
      withCredentials: true,
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      }
    }).then(response => {
      return response.data
    })
  },

  fetchFav() {
    return axios({
      method: 'get',
      url: devEnv + 'users/getfavourites.php',
      withCredentials: true,
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      }
    }).then(response => {
      return response.data
    })
  },

  deleteFav(payload) {
    return axios({
      method: 'delete',
      url: devEnv + 'users/deleteFavourite.php',
      data: payload,
      withCredentials: true,
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      }
    }).then(response => {
      return response.data
    })
  },

  deleteAll() {
    return axios({
      method: 'delete',
      url: devEnv + 'users/deleteAllFavourite.php',
      withCredentials: true,
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      }
    }).then(response => {
      return response.data
    })
  }

}
