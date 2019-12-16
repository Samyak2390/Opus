import axios from 'axios'

const devEnv = 'http://localhost/'
// const prodEnv = ''

const apiClient = axios.create({
  baseURL: devEnv
})

export default {
  test: {
    apitest(payload) {
      return apiClient.get('WAT/wat2019/api-opus/ajaxfile.php', payload || '')
    }
  }
}
