import axios from 'axios'

const axiosInstance = axios.create({
  baseURL: 'http://localhost:5000/',
  headers: {
    authorization: `Bearer ${localStorage.getItem('token') as string}`
  }
})

export default axiosInstance
