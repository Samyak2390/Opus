import eventService from './eventService'

export const testapi = (callback, payload) => {
  eventService.test.apitest(payload)
    .then(response => {
      console.log('res>>>>>', response)
      console.log('res>>>>>', response.data)
      callback(response.data)
    })
    .catch(error => {
      console.log(error)
    })
}
