import { create } from 'apisauce'

// define the api
const api = create({
  baseURL: 'https://order-pizza-api.herokuapp.com/api',
  headers: { 
        "Content-Type": "application/json"
    },
})

if (__DEV__) {
    const naviMonitor = response => {
      const url = response.config.url

      console.log(`listen! ${response.config.method.toUpperCase()} ${url}`, response)
    }
    api.addMonitor(naviMonitor)
  }

// Api services
export const doLogin = (loginData) => api.post('auth', loginData)

export const doCreateOrder = (orderData, accessToken) => {
  let headers = {
    "Authorization": `Bearer ${accessToken}`
  }
  return api.post(
    'orders', 
    orderData,
    {
      headers
    })
}

export const getOrders = ( accessToken) => {
  let headers = {
    "Authorization": `Bearer ${accessToken}`
  }
  return api.get('orders', 
    null,
    {
      headers
    })
}

export const doDeleteOrder = (orderId, accessToken) => {
  let headers = {
    "Authorization": `Bearer ${accessToken}`
  }
  return api.delete(
    `orders/${orderId}`, 
    null,
    {
      headers
    })
}

