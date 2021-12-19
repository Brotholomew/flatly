import axios from 'axios'

const AxiosInstance = axios.create({
  baseURL:
    process.env.NODE_ENV !== 'development'
      ? 'http://20.127.80.3:8080/api/v1/'
      : 'http://127.0.0.1:3001/',
  timeout: 10000,
  maxBodyLength: 5000,
  maxContentLength: 5000,

  headers: {
    'Content-type': 'application/json; charset=UTF-8',
  },
})

AxiosInstance.interceptors.request.use(
  (request: any) => {
    return request
  },
  (error) => {
    //(new ErrorService()).handle(error.response?.status, error.response?.data)
    throw error
  }
)

AxiosInstance.interceptors.response.use(
    ({ data }: any) => data,
    (error: any) => {
      //(new ErrorService()).handle(error.response?.status, error.response?.data)
      throw error
    }
)

export default AxiosInstance;
