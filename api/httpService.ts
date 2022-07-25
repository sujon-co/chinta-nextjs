import axios from 'axios';
import { config } from 'config';

const instance = axios.create({
    baseURL: config.baseUrl + '/api/',
    timeout: 15000,
});

export default instance;
