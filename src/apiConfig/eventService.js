import axios from 'axios'

const devEnv = 'http://localhost:80/WAT/wat2019/api-opus/api'
// const prodEnv = ''

const apiClient = axios.create({
  baseURL: devEnv,
  headers: {
    'Content-Type': 'application/json',
    'Authorization': 'Bearer ' + localStorage.token
  }
})

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
  checkIfLogged() {
    return apiClient.get('/users/sessionStatus.php')
      .then(response => {
        return response.data
      })
  },
  userRegister(payload) {
    console.log('regPayload>>>', payload)
    return apiClient.post('/users/register.php', payload, { headers: { 'Content-Type': 'application/json' } })
  }
}
