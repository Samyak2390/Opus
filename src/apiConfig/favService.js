// import { apiClient } from './eventService'
import axios from 'axios'
export default {
  addToFav(payload) {
    return axios({
      method: 'post',
      url: 'http://localhost:80/WAT/wat2019/api-opus/api/users/addfavourite.php',
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
      url: 'http://localhost:80/WAT/wat2019/api-opus/api/users/getfavourites.php',
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
      url: 'http://localhost:80/WAT/wat2019/api-opus/api/users/deleteFavourite.php',
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
      url: 'http://localhost:80/WAT/wat2019/api-opus/api/users/deleteAllFavourite.php',
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
