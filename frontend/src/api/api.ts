import axios from "axios"

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
})

api.interceptors.response.use(null, (error) => {
  const status = error.response?.status
  const msg = error.response?.data?.message ?? error.message
  return Promise.reject(new Error(`HTTP ${status ?? "??"} - ${msg}`))
})

export default api
