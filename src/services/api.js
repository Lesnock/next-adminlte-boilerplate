import Axios from 'axios'

import apiConfig from '../config/api'

export default Axios.create({
  baseURL: `${apiConfig.host}:${apiConfig.port}`
})
