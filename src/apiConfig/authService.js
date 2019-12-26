import { apiClient } from './eventService'
export default {

  test: {
    apitest(payload) {
      return apiClient.get('/ajaxfile.php', payload || '')
    }
  },

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

  checkIfLogged() {
    return apiClient.get('/users/sessionStatus.php')
      .then(response => {
        return response.data
      })
  },
  userRegister(payload) {
    console.log('regPayload>>>', payload)
    return apiClient.post('/users/register.php', payload)
      .then(response => {
        return response.data
      })
  }
}
