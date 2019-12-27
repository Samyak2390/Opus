import { apiClient } from './eventService'
export default {
  addToFav(payload) {
    return apiClient.post('users/addfavourite.php', payload)
      .then(response => {
        console.log('from', response)
        return response.data
      })
  }

}
