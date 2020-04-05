import axios from 'axios';
import authHeader from './Auth-header';
import ApiService from "./ApiService";

const API_URL = ApiService.API_ENDPOINT;

class UserService {
    getPublicContent() {
        return axios.get(API_URL + '/api/auth/all');
    }

    getUserBoard() {
        return axios.get(API_URL + '/api/auth/user', { headers: authHeader() });
    }

    getModeratorBoard() {
        return axios.get(API_URL + '/api/auth/mod', { headers: authHeader() });
    }

    getAdminBoard() {
        return axios.get(API_URL + '/api/auth/admin', { headers: authHeader() });
    }
}

export default new UserService();
