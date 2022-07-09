import { IAdmin } from 'server/interface';
import requests from './httpService';

class AuthService {
    login(body: IAdmin): Promise<IAdmin> {
        return requests.post('/admin/login', body);
    }
    logout(): Promise<void> {
        return requests.delete('/admin/logout');
    }
}

export default new AuthService();
