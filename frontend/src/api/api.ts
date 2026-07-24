import axios from "axios"

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
})

api.interceptors.response.use( 
  (response) => response,
  (error) => {
    const status = error.response?.status
    const msg = error.response?.data?.message ?? error.message
   
    error.message = `HTTP ${status ?? "??"} - ${msg}`

    return Promise.reject(error)
  }
)

export default api
