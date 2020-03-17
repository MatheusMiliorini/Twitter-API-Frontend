import axios from 'axios';
import { BACKEND_URL } from '../utils/consts';

const api = axios.create({
    baseURL: BACKEND_URL
});

console.log(BACKEND_URL);

export default api;