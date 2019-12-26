import { apiClient } from './eventService'
export default {
  addItem(payload) {
    console.log('regPayload>>>', payload)
    return apiClient.post('/admin/additem.php', payload)
      .then(response => {
        return response.data
      })
  }
}