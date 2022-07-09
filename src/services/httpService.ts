import axios, { AxiosResponse } from 'axios';

const response = (res: AxiosResponse) => res.data?.data;

const requests = {
    get: (url: string) => axios.get(url).then(response),
    post: (url: string, body: object) => axios.post(url, body).then(response),
    patch: (url: string, body: object) => axios.patch(url, body).then(response),
    delete: (url: string) => axios.delete(url).then(response),
};

export default requests;
