import axios from 'axios'
const devEnv = 'http://localhost:80/WAT/wat2019/api-opus/api/'
// const prodEnv = 'http://c7202779.epizy.com/wat2019/api-opus/api/'

export const apiClient = axios.create({
  baseURL: devEnv,
  headers: {
    'Content-Type': 'application/json',
    'Authorization': localStorage.token
  }
})
