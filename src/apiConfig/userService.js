import { apiClient } from './eventService'

export default {
  getUsers() {
    return apiClient.get('users/getusers.php')
      .then(response => {
        return response.data
      })
  },
  changeRole(payload) {
    return apiClient.post('users/changerole.php', payload)
      .then(response => {
        return response.data
      })
  }
}
