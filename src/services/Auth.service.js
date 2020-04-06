import axios from 'axios';
import ApiService from "./ApiService";
import authHeader from "./Auth-header";

const API_URL = ApiService.API_ENDPOINT;

class AuthService {
    login(user) {
        return axios
            .post(API_URL + '/api/auth/signin', {
                username: user.username,
                password: user.password
            })
            .then(response => {
                if (response.data.accessToken) {
                    localStorage.setItem('user', JSON.stringify(response.data));
                }

                return response.data;
            });
    }

    logout() {
        localStorage.removeItem('user');
    }

    register(user) {
        return axios.post(API_URL + '/api/auth/signup', {
            username: user.username,
            email: user.email,
            password: user.password,
            role : user.role
        }, {headers : authHeader()});
    }
}

export default new AuthService();
