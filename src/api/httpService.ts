import axios from 'axios';
import { config } from 'src/config';

const instance = axios.create({
    baseURL: config.baseUrl + '/api/',
    timeout: 20000,
});

export default instance;

export const imageUploadInstance = axios.create({
    baseURL: `${config.imageUploadUrl}/api`,
    timeout: 10000,
});
