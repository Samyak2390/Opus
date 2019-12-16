import axios from 'axios'

const devEnv = 'http://localhost:80/'
// const prodEnv = ''

const apiClient = axios.create({
  baseURL: devEnv
})

export default {

  test: {
    apitest(payload) {
      return apiClient.get('WAT/wat2019/api-opus/ajaxfile.php', payload || '')
    }
  },

  userLogin(payload) {
    return apiClient.post('WAT/wat2019/api-opus/api/users/login.php', payload)
      .then(response => {
        return response.data
      })
  },
  checkIfLogged() {
    return apiClient.get('WAT/wat2019/api-opus/api/sessionStatus.php')
      .then(response => {
        return response.data
      })
  }
}
