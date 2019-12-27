import { apiClient } from './eventService'
export default {
  addItem(payload) {
    return apiClient.post('/admin/additem.php', payload)
      .then(response => {
        return response.data
      })
  },
  fetchHighestRated() {
    return apiClient.get('/books/ratedItems.php')
      .then(response => {
        return response.data
      })
  }
}
