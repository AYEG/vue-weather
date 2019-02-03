import axios from 'axios'

// import { apiRootURL } from '@/env';

// const axiosInstance = axios.create({
//   baseURL: 'https://localhost:8080'
// })

export default ({ Vue }) => {
  Vue.prototype.$axios = axios
}

// export { axiosInstance }
