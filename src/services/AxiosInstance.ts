import axios from 'axios'
import {USER_STORAGE_KEY} from "common/constants/userConstants";

const userStorage = localStorage.getItem(USER_STORAGE_KEY);
const userObject = userStorage ? JSON.parse(userStorage) : null;

const AxiosInstance = axios.create({
  baseURL:
    process.env.NODE_ENV !== 'development'
      ? 'https://backend.flatly.online/api/v1/'
      : 'http://127.0.0.1:3001/',
  timeout: 10000,
  maxBodyLength: 5000,
  maxContentLength: 5000,

  headers: {
    'Content-type': 'application/json; charset=UTF-8',
    'Authentication': userObject?.value
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
