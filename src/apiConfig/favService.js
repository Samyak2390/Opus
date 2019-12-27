import { apiClient } from './eventService'
export default {
  addToFav(payload) {
    return apiClient.post('users/addfavourite.php', payload)
      .then(response => {
        return response.data
      })
  },
  fetchFav() {
    return apiClient.get('users/getfavourites.php')
      .then(response => {
        console.log('resp>>>>>', response)
        return response.data
      })
  }
}
