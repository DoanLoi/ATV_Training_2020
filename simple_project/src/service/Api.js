import axios from 'axios'
import {store} from '../store/store'

const instance = axios.create({
   baseURL: 'http://localhost:2108',
  // baseURL: 'http://localhost:3000/',
  headers: {
    Authorization: `Bearer ${localStorage.getItem('token')}`
  }
})
export default instance
