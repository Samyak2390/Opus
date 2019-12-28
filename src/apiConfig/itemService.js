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
  },
  fetchBestSellers() {
    return apiClient.get('/books/bestsellers.php')
      .then(response => {
        return response.data
      })
  },
  fetchNewReleases() {
    return apiClient.get('/books/newReleases.php')
      .then(response => {
        return response.data
      })
  },
  fetchCategory() {
    return apiClient.get('/books/categories.php')
      .then(response => {
        return response.data
      })
  },
  fetchCategoryData(payload) {
    return apiClient.post('/books/categoryData.php', payload)
      .then(response => {
        return response.data
      })
  },
  sortData(payload) {
    return apiClient.post('/books/sortData.php', payload)
      .then(response => {
        return response.data
      })
  }
}
