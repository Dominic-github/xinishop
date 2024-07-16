import axios from 'axios'

const instance = axios.create({
  baseURL: process.env.BACKEND_URL,
  timeout: 1000
})
instance.interceptors.response.use((response) => {
  return response.data
})

export default instance
