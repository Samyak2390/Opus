import { apiClient } from './eventService'
export default {

  userLogin(payload) {
    return apiClient.post('/users/login.php', payload)
      .then(response => {
        return response.data
      })
  },

  userLogout() {
    return apiClient.post('/users/logout.php')
      .then(response => {
        return response.data
      })
  },

  userRegister(payload) {
    return apiClient.post('/users/register.php', payload)
      .then(response => {
        return response.data
      })
  }
}
