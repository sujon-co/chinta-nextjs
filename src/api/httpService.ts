import axios from 'axios';
import { config } from 'src/config';

const instance = axios.create({
    baseURL: config.baseUrl + '/api/',
});

export default instance;

export const imageUploadInstance = axios.create({
    baseURL: `${config.imageUploadUrl}/api`,
    timeout: 10000,
});
