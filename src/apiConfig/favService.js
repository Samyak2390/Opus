import axios from 'axios'
// const prodEnv = 'http://c7202779.epizy.com/wat2019/api-opus/api/'
const prodEnv = 'http://localhost:80/WAT/wat2019/api-opus/api/'
export default {
  addToFav(payload) {
    return axios({
      method: 'post',
      url: prodEnv + 'users/addfavourite.php',
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
      url: prodEnv + 'users/getfavourites.php',
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
      url: prodEnv + 'users/deleteFavourite.php',
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
      url: prodEnv + 'users/deleteAllFavourite.php',
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
