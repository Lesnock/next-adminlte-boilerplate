import Axios from 'axios'
import Cookies from 'js-cookie'

import apiConfig from '../config/api'

const api = Axios.create({
  baseURL: `${apiConfig.host}:${apiConfig.port}`
})

/**
 * Request
 */
api.interceptors.request.use((request) => {
  const token = Cookies.get('token')

  if (token) {
    request.headers.Authorization = `Bearer ${token}`
  }

  return request
})

/**
 * Response
 */
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response.data && error.response.data.error) {
      throw new Error(error.response.data.error)
    }

    if (error.response.status === 401) {
      throw new Error('Não permitido')
    }

    if (error.response.status === 403) {
      throw new Error('Acesso negado')
    }

    if (error.response.status === 404) {
      throw new Error('Não encontrado')
    }
  }
)

export default api
